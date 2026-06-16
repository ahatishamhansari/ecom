import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

export interface FitDnaDto {
  height?: number; weight?: number; chest?: number; waist?: number; hips?: number;
  inseam?: number; shoulderWidth?: number; armLength?: number;
  shoeSize?: number; shoeSizeSystem?: string;
  bodyShape?: string; fitPreference?: string;
}

@Injectable()
export class FitDnaService {
  constructor(private readonly prisma: PrismaService) {}

  async get(userId: string) {
    return this.prisma.fitDna.findUnique({ where: { userId } });
  }

  async upsert(userId: string, dto: FitDnaDto) {
    return this.prisma.fitDna.upsert({
      where: { userId },
      update: dto,
      create: { userId, ...dto },
    });
  }

  /**
   * Recommend a size for a given product variant set using FitDNA.
   * Phase 4 will replace this with the real ML model call.
   * For now returns a rule-based recommendation.
   */
  async recommendSize(userId: string, productId: string, variantOptions: { size: string; chest?: number; waist?: number }[]) {
    const dna = await this.prisma.fitDna.findUnique({ where: { userId } });
    if (!dna || !dna.chest) return { recommendation: null, confidence: 0, reason: 'FitDNA not set up' };

    // Rule-based until ML model in Phase 4
    let best = variantOptions[Math.floor(variantOptions.length / 2)];
    let confidence = 0.75;

    for (const variant of variantOptions) {
      if (variant.chest && Math.abs(variant.chest - (dna.chest || 0)) < 3) {
        best = variant;
        confidence = 0.95;
        break;
      }
    }

    return {
      recommendation: best.size,
      confidence,
      reason: `Based on your chest measurement of ${dna.chest}cm`,
      fitPreference: dna.fitPreference,
    };
  }
}

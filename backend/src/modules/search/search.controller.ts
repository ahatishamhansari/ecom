import { Controller, Get, Query } from '@nestjs/common';
import { SearchService } from './search.service';

@Controller('search')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Get()
  search(
    @Query('q') q: string,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
    @Query('filter') filter?: string,
    @Query('sort') sort?: string,
  ) {
    return this.searchService.search(q || '', {
      page: page ? +page : 1,
      limit: limit ? +limit : 20,
      filter,
      sort: sort ? sort.split(',') : undefined,
    });
  }
}

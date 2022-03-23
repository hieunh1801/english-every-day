export default interface QueryParam {
  _page?: number;
  _limit?: number;
  _sort?: string;
  _order?: string;

  _start?: number;
  _end?: number;

  q?: string; // full text search
}

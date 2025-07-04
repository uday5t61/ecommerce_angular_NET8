﻿namespace API.RequestHelper
{
    public class Pagination<T>(int pageIndex, int pageSize, int count, IReadOnlyList<T> data)
    {
        public int PageIndex { get; set; } = pageIndex;
        public int PageSize { get; set; } = pageSize;
        public int TotalCount { get; set; } = count;
        public IReadOnlyList<T> Data { get; set; } = data;
    }
}

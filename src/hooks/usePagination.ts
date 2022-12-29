import { left, right, TEither } from 'types/Either/index';

class PaginationController {
    private readonly minimumNumberOfPages: number = 1;
    private maximumNumberOfPages = 1;
    constructor(
    private maxPaginationItems: number,
    ) { }

    private getNumberPages(quantityPerPage: number, totalProducts: number) {
        const pagesNumber = Math.ceil(Number(totalProducts / quantityPerPage));
        return pagesNumber ? pagesNumber : 1;
    }

    public generateArrayOfPages(quantityPerPage: number, totalProducts: number): TEither<null, { value: number, text: string, active: boolean }[]> {
        const maximumNumberOfPages = this.getNumberPages(quantityPerPage, totalProducts);
        const pages = Array.from(Array(maximumNumberOfPages),
            (_, index) => ({
                value: index,
                text: String(index),
                active: false,
            })
        );
        this.maximumNumberOfPages = maximumNumberOfPages;
        return (pages && (!!pages.length))
            ? right(pages)
            : left(null);
    }

    private getPageRange(currentPage: number) {
        let start = currentPage > 1
            ? currentPage - 2
            : currentPage;
        const end = start < 2
            ? this.maxPaginationItems + 1
            : currentPage + this.maxPaginationItems - 1;

        start = end >= this.maximumNumberOfPages ? this.maximumNumberOfPages - this.maxPaginationItems : start;
        start = start < 1 ? 1 : start;
        return { start, end };
    }

    private getExtremeValuesFromPagination(currentPage: number) {
        const $initialPageLi = (this.maximumNumberOfPages > this.maxPaginationItems && currentPage > this.maxPaginationItems)
            ? `${1}...` : null;
        const $finalPageLi = (currentPage + this.maxPaginationItems <= this.maximumNumberOfPages)
            ? `...${this.maximumNumberOfPages}` : this.maximumNumberOfPages;

        const initialPageValues = $initialPageLi
            ? { value: this.minimumNumberOfPages, text: $initialPageLi, active: currentPage === 1 }
            : null;

        const finalPageValues = { value: this.maximumNumberOfPages, text: $finalPageLi, active: currentPage === this.maximumNumberOfPages };
        return { initialPageValues, finalPageValues };
    }

    public getPageRangeArray(currentPage: number, pages: { value: number, active: boolean, text: string | number }[]) {
        const { start, end } = this.getPageRange(currentPage);
        const { initialPageValues, finalPageValues } = this.getExtremeValuesFromPagination(currentPage);

        const part = pages.slice(start, end)
            .map(page => {
                const active = page.value === currentPage;
                return { ...page, active };
            });
        finalPageValues && part.push(finalPageValues);
        return initialPageValues ? [initialPageValues, ...part] : [...part];
    }

    public setPaginationRef(paginationData: any) {
        // eslint-disable-next-line no-restricted-globals
        history.pushState({ ...paginationData },
            `page-ref-${paginationData.page}`,
            window.location.href);
    }
}

export const usePagination = (maxPaginationItems: number) =>
    new PaginationController(maxPaginationItems);
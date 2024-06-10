function currentItems (total, start, limit) {
    //Checks if start and limit are a number or if the start, limit and total are 0 or under
    if (isNaN(start) || isNaN(limit) || start < 1 || limit <= 0 || total < 0) {
        return total
    }
    // You add +1 to prevent the last page from not displaying properly. If 22 is your total and 21 is your start, you want both 21 and 22 displayed, so you add +1 to make sure 22 gets displayed.
    return (total - start + 1)
}

function numberOfPages (total, start, limit) {
    //Checks if start and limit are a number or if the start, limit and total are 0 or under
    if (isNaN(start) || isNaN(limit) || start < 1 || limit <= 0 || total < 0){

        //Sets the empty number(s) to 1, so it doesn't crash. Means the start starts at 1 or the limit per page is 1.
        return 1;
    }
    //Total amount of database entries devided by the limit of entries on a page
    return Math.ceil(total / limit);
}

function currentPage (total, start, limit) {
    //Checks if start and limit are a number or if the start, limit and total are 0 or under
    if (isNaN(start) || isNaN(limit) || start < 1 || limit <= 0 || total < 0) {

        //Sets the empty number(s) to 1, so it doesn't crash. Means the start starts at 1 or the limit per page is 1.
        return 1;
    }
    return Math.ceil(start / limit)
}

function firstPageitem () {
    //The first page item is always start 1, so you can just return 1.
    return 1;
}

function lastPageitem (total, start, limit) {
    //Checks if start and limit are a number or if the start, limit and total are 0 or under
    if (isNaN(start) || isNaN(limit) || start < 1 || limit <= 0 || total < 0) {

        //Sets the empty number(s) to 1, so it doesn't crash. Means the start starts at 1 or the limit per page is 1.
        return 1;
    }
    //Takes the start value + limit and it subtracts one.
    //For example, if the start is 6 and the limit is 5, it adds to 11. It subtracts 1, which makes it go to the last entry on page 2 rather than opening up the first entry in page 3.
    return Math.min(start + limit - 1, total)
}

function previousPageItem(total, start, limit) {
    //Checks if start and limit are a number or if the start, limit and total are 0 or under
    if (isNaN(start) || isNaN(limit) || start < 1 || limit <= 0 || total < 0) {

        //Sets the empty number(s) to 1, so it doesn't crash. Means the start starts at 1 or the limit per page is 1.
        return 1;
    }

    //Takes the start and subtracts the limit. Has a minimum value of 1, so you cannot go back on the first page.
    return Math.max(start - limit, 1)
}

function nextPageItem(total, start, limit) {
    //Checks if start and limit are a number or if the start, limit and total are 0 or under
    if (isNaN(start) || isNaN(limit) || start < 1 || limit <= 0 || total < 0) {

        //Sets the empty number(s) to 1, so it doesn't crash. Means the start starts at 1 or the limit per page is 1.
        return 1;
    }

    //Takes the start and subtracts the limit. Has a minimum value of 1, so you cannot go back on the first page.
    return Math.max(start + limit, total)
}

function getFirstQueryString(total, start, limit) {
    //First thing this does: Check if Start or limit are not a number or if start is less than 1.
    ///Second thing it does is check if the condition is true (if the above thing is true or not) by using '?'
    //Third thing it does is return and empty string if true, or the query if false.
    return (isNaN(start) || isNaN(limit) || start <= 1 ? "" : `?start=${firstPageitem(total, start, limit)}`);
}

function getLastQueryString(total, start, limit) {
    //First thing this does: Check if Start or limit are not a number or if start is less than 1.
    ///Second thing it does is check if the condition is true (if the above thing is true or not) by using '?'
    //Third thing it does is return and empty string if true, or the query if false.
    return (isNaN(start) || isNaN(limit) || start <= 1 ? "" : `?start=${lastPageitem(total, start, limit)}`);
}

function getPreviousQueryString(total, start, limit) {
    //First thing this does: Check if Start or limit are not a number or if start is less than 1.
    ///Second thing it does is check if the condition is true (if the above thing is true or not) by using '?'
    //Third thing it does is return and empty string if true, or the query if false.
    return (isNaN(start) || isNaN(limit) || start <= 1 ? "" : `?start=${previousPageItem(total, start, limit)}`);
}

function getNextQueryString(total, start, limit) {
    //First thing this does: Check if Start or limit are not a number or if start is less than 1.
    ///Second thing it does is check if the condition is true (if the above thing is true or not) by using '?'
    //Third thing it does is return and empty string if true, or the query if false.
    return (isNaN(start) || isNaN(limit) || start <= 1 ? "" : `?start=${nextPageItem(total, start, limit)}`);
}

// function itemToPageNumber(total, start, limit, itemNumber) {
//     //Checks if start and limit are a number or if the start, limit and total are 0 or under
//     if (isNaN(start) || isNaN(limit) || start < 1 || limit <= 0 || total < 0 || itemNumber < start) {
//
//         //Sets the empty number(s) to 1, so it doesn't crash. Means the start starts at 1 or the limit per page is 1.
//         return 1;
//     }
//     //Calculates the start devided by the specific item number to give the amount of remaining entries.
//     const itemOffset = itemNumber - start;
//
//     //The amount of remaining entries devided by the limit of the page + 1 rounded up to get to the right page
//     //Example: itemNumber 68, start 21, Limit 10
//     // 68 - 21 = 47
//     // 47 / 10 + 1 = 5.7 which gets upped to 6 because of Math.Ceil
//     // Item is on page 6
//     return Math.ceil(itemOffset / limit) + 1;
//
// }
const createPagination = (total, start, limit, paginatedItems) => {
    return {
        items: paginatedItems,
        _links: {
            self: { href: `http://145.24.222.70:8000/animals` }
        },
        pagination: {
            currentPage: currentPage(total, start, limit),
            currentItems: currentItems(total, start, limit),
            totalPages: numberOfPages(total, start, limit),
            totalItems: total,
            _links: {
                first: {
                    page: firstPageitem(),
                    href: `http://145.24.222.70:8000/animals${getFirstQueryString(total, start, limit)}`
                },
                last: {
                    page: numberOfPages(total, start, limit),
                    href: `http://145.24.222.70:8000/animals${getLastQueryString(total, start, limit)}`
                },
                previous: {
                    page: previousPageItem(),
                    href: `http://145.24.222.70:8000/animals${getPreviousQueryString(total, start, limit)}`
                },
                next: {
                    page: nextPageItem(),
                    href: `http://145.24.222.70:8000/animals${getNextQueryString(total, start, limit)}`
                }
            }
        }
    };
};
export default createPagination;


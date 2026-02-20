import {test, expect} from '@playwright/test';

test("GET /products", async ({request}) => {
    const apiUrl = "https://api.practicesoftwaretesting.com";
    const res = await request.get(apiUrl + "/products");
    expect(res.status()).toBe(200);
    const products = await res.json();
    // console.log(products);
    expect(products.per_page).toBe(9);
})
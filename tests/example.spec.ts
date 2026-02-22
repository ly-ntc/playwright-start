import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});

test('get started link', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});

//radio button test
test('radio button test', async ({ page }) => {
  await page.goto('https://www.w3schools.com/html/tryit.asp?filename=tryhtml_form_radio');

  // Click the "Try it" button to open the iframe
  await page.getByLabel('XL').check();

  //assertion to verify the radio button is checked
  await expect(page.getByLabel('XL')).toBeChecked();
  //use tobeTruthy to check if the radio button is checked
  expect(page.getByLabel('XL').isChecked()).toBeTruthy();
  expect(page.getByLabel('L').isChecked()).toBeFalsy();

})

//checkbox test and multiple checkbox test
test('checkbox test', async ({ page }) => {
  await page.getByLabel('I agree to the terms above').check();
  expect(page.getByLabel('Subscribe to newsletter')).toBeChecked();
  //multiple checkbox test
  const listCheckbox = [
    '#vehicle1', // I have a bike
    '#vehicle2', // I have a car
    '#vehicle3'  // I have a boat
  ]
  for (const checkbox of listCheckbox) {
    await page.locator(checkbox).check();
    expect(page.locator(checkbox)).toBeChecked();
  }
  //assertion to verify the number of checkboxes
  const checkboxes = await page.locator('input[type="checkbox"]').count();
  expect(checkboxes).toBe(4); // Assuming there are 4 checkboxes on the page

})

//dropdown test
test('dropdown test', async ({ page }) => {
  await page.goto('https://testautomationpractice.blogspot.com');

  // Multiple ways to select an option from the dropdown
  // await page.locator('#country').selectOption('India'); // Select by value

  // await page.locator('#country').selectOption({ label: 'India' }); // Select by label

  // await page.locator('#country').selectOption({ index: 1 }); // Select by index

  // await page.locator('#country').selectOption({ value: 'India' }); // Select by value again

  await page.selectOption('#country', 'India'); // Select by value using selectOption method

  //assertion to verify the selected option
  //1, check number of options in the dropdown
  // const options = await page.locator('#country option').count();
  // expect(options).toBe(10); // Assuming there are 10 options in the dropdown

  //2, check number of options in dropdown
  // const options = await page.$$('#country option');
  // expect(options.length).toBe(10); // Assuming there are 10 options in the dropdown

  //3, check presence of value  in dropdown
  // const content = await page.locator('#country').textContent();
  // expect(content?.includes('India')).toBeTruthy(); // Assuming 'India' is an option in the dropdown

  //4, check presence of value in dropdown using looping 
  const options = await page.$$('#country option');
  let isIndiaPresent = false;
  for (const option of options) {
    // console.log(await option.textContent());
    let value = await option.textContent();
    if (value?.includes('India')) {
      isIndiaPresent = true;
      break;
    }
  }
  expect(isIndiaPresent).toBeTruthy(); // Assert that 'India' is present in the dropdown options
})

//multiple dropdown test
test('multiple select dropdown test', async ({ page }) => {
  await page.goto('https://testautomationpractice.blogspot.com');

  // Select multiple options from the dropdown
  await page.selectOption('#colors', ['Red', 'Green', 'Blue']); // Select multiple options by value

  // Assertion to verify the selected options
  //1, check number of options in the dropdown
  const options = await page.locator('#colors option').count();
  expect(options).toBe(7); // Assuming there are 5 options in the dropdown

  //2, check presence of value in dropdown
  const content = await page.locator('#colors').textContent();
  expect(content?.includes('Red')).toBeTruthy(); // Assuming 'Red' is an option in the dropdown
  expect(content?.includes('Green')).toBeTruthy(); // Assuming 'Green' is an option in the dropdown
  expect(content?.includes('Blue')).toBeTruthy(); // Assuming 'Blue' is an option in the dropdown

})

//boostrap dropdown test
test.fixme('bootstrap dropdown test', async ({ page }) => {
  await page.goto('https://www.jquery-az.com/boots/demo.php?ex=63.0_2');

  // Click the dropdown to open it
  await page.locator('.multiselect').click();

  // assertion to verify the dropdown is opened
  const options = await page.$$('ul>li label input')
  expect(options.length).toBe(11) // Assuming there are 11 options in the dropdown

  //select option in dropdown
  const optionSelects = page.locator('ul>li label');
  const count = await optionSelects.count();
  for (let i = 0; i < count; i++) {
    const value = await optionSelects.nth(i).textContent();
    if (value?.includes('Angular') || value?.includes('Java')) {
      await optionSelects.nth(i).click();
    }
  }
})

//Auto suggestion dropdown test
test.fixme('auto suggestion dropdown test', async ({ page }) => {
  await page.goto('https://www.google.com/');

  // Type in the search box to trigger the auto-suggestion dropdown
  await page.locator('input[name="q"]').type('playwright');

  // Wait for the auto-suggestion dropdown to appear
  const suggestions = page.locator('ul[role="listbox"] li');
  await expect(suggestions).toBeVisible();
  // Assertion to verify the number of suggestions
  const suggestionCount = await suggestions.count();
  expect(suggestionCount).toBeGreaterThan(0); // Assuming there are suggestions in the dropdown

  // Assertion to verify the presence of a specific suggestion
  let isPlaywrightTestingPresent = false;
  for (let i = 0; i < suggestionCount; i++) {
    const suggestionText = await suggestions.nth(i).textContent();
    if (suggestionText?.includes('playwright testing')) {
      isPlaywrightTestingPresent = true;
      break;
    }
  }
  expect(isPlaywrightTestingPresent).toBeTruthy(); // Assert that 'playwright testing' is present in the suggestions
})

//handle hidden items in dropdown -- xử lý nhưng bình thường, bật chế độ debug để thấy được

//alert, confirm, prompt test
test.fixme('alert test', async ({ page }) => {
  await page.goto('https://testautomationpractice.blogspot.com/');

  //enable alter
  page.on('dialog', async dialog => {
    expect(dialog.type()).toContain('alert'); // Assert that the dialog is an alert
    expect(dialog.message()).toBe('I am an alert box!'); // Assert the alert message
    await dialog.accept(); // Accept the alert
  })

  // Click the button to trigger the alert
  await page.locator('//button[normalize-space()="Alert"]').click();
})

test.fixme('confirm test', async ({ page }) => {
  await page.goto('https://testautomationpractice.blogspot.com/');

  //enable confirm
  page.on('dialog', async dialog => {
    expect(dialog.type()).toContain('confirm'); // Assert that the dialog is a confirm
    expect(dialog.message()).toBe('Press a button!'); // Assert the confirm message
    await dialog.accept(); // Accept the confirm
  })

  // Click the button to trigger the confirm
  await page.locator('//button[normalize-space()="Confirm Box"]').click();
})

test.fixme('prompt test', async ({ page }) => {
  await page.goto('https://testautomationpractice.blogspot.com/');

  //enable prompt
  page.on('dialog', async dialog => {
    expect(dialog.type()).toContain('prompt'); // Assert that the dialog is a prompt
    expect(dialog.message()).toBe('Please enter your name:'); // Assert the prompt message
    await dialog.accept('Playwright'); // Accept the prompt with input
  })

  // Click the button to trigger the prompt
  await page.locator('//button[normalize-space()="Prompt"]').click();

  // Assertion to verify the result of the prompt input
  const resultText = await page.locator('#demo').textContent();
  expect(resultText).toBe('Hello Playwright! How are you today?'); // Assert the result text after accepting the prompt
})

//frame
test.fixme('frame test', async ({ page }) => {
  await page.goto('https://testautomationpractice.blogspot.com/');

  //total
  const frames = page.frames();
  console.log('Total frames: ' + frames.length); // Log the total number of frames on the page

  //approach 1: using name or url
  const frame1 = await page.frame({ url: "https://www.rahulshettyacademy.com/AutomationPractice/" });
  await frame1?.fill('#name', 'Playwright'); // Fill the input field inside the frame

  //approach 2: using locator
  const frameElement = await page.frameLocator('iframe[src="https://www.rahulshettyacademy.com/AutomationPractice/"]').locator('#name');
  frameElement.fill("Hello"); // Fill the input field inside the frame using frame locator

})

//table and table filter test
test.fixme('table test', async ({ page }) => {
  await page.goto('https://testautomationpractice.blogspot.com/');

  // Get the table rows
  const rows = page.locator('#product>tbody>tr');
  const rowCount = await rows.count();
  console.log('Total rows: ' + rowCount); // Log the total number of rows in the table

  // Loop through the rows and log the product names and prices
  for (let i = 0; i < rowCount; i++) {
    const productName = await rows.nth(i).locator('td').nth(0).textContent();
    const price = await rows.nth(i).locator('td').nth(1).textContent();
    console.log(`Product: ${productName}, Price: ${price}`);
  }

  // Filter the table to find a specific product and log its price
  const targetProduct = 'Master Selenium Framework';
  let targetPrice = '';
  for (let i = 0; i < rowCount; i++) {
    const productName = await rows.nth(i).locator('td').nth(0).textContent();
    if (productName?.trim() === targetProduct) {
      targetPrice = await rows.nth(i).locator('td').nth(1).textContent() || '';
      break;
    }
  }
  console.log(`Price of ${targetProduct}: ${targetPrice}`); // Log the price of the target product
})

//upload file
test.fixme('file upload test', async ({ page }) => {
  await page.goto('https://testautomationpractice.blogspot.com/');

  // Upload a file using setInputFiles
  const filePath = 'path/to/your/file.txt'; // Replace with the actual file path
  await page.setInputFiles('#myFile', filePath); // Set the file input with the specified file
  // Assertion to verify the file upload
  const uploadedFileName = await page.locator('#myFile').inputValue();
  expect(uploadedFileName).toContain('file.txt'); // Assert that the uploaded file name is correct
})

//download file
test.fixme('file download test', async ({ page }) => {
  await page.goto('https://testautomationpractice.blogspot.com/');

  // Trigger the file download and wait for it to complete  
  const [download] = await Promise.all([
    page.waitForEvent('download'), // Wait for the download event to be triggered
    page.locator('a[download="testfile.txt"]').click() // Click the link to start the download
  ]);

  // Save the downloaded file to a specific location
  const downloadPath = 'path/to/save/downloaded/file.txt'; // Replace with the desired download path
  await download.saveAs(downloadPath); // Save the downloaded file to the specified path  
  // Assertion to verify the file download
  const fileExists = await page.evaluate((path) => {
    return new Promise((resolve) => {
      const fs = require('fs');
      fs.access
        (path, fs.constants.F_OK, (err: any) => {
          resolve(!err); // Resolve true if the file exists, false otherwise
        });
    });
  }, downloadPath);
  expect(fileExists).toBeTruthy(); // Assert that the downloaded file exists at the specified path
}
)

//date picker test
test.fixme('date picker test', async ({ page }) => {
  await page.goto('https://testautomationpractice.blogspot.com/');
  
  // Open the date picker
  await page.locator('#datepicker').click();
  // Select a date from the date picker
  const targetDate = '15';
  const dateOptions = page.locator('.ui-datepicker-calendar td a');
  const dateCount = await dateOptions.count();
  for (let i = 0; i < dateCount; i++) {
    const dateText = await dateOptions.nth(i).textContent();
    if (dateText === targetDate) {
      await dateOptions.nth(i).click(); // Click the target date
      break;
    }
  }
  // Assertion to verify the selected date
  const selectedDate = await page.locator('#datepicker').inputValue();
  expect(selectedDate).toContain(targetDate); // Assert that the selected date is correct
})
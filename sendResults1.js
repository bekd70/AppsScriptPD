/**
 * this function receives the input from the form as an event (e)
 * and sends the responses back to the user in an email
 */

function sendResults(e) {
  //the Spreadsheet you created when you made the form
  //the ID for the spreadsheet can be found in the URL for the sheet https://docs.google.com/spreadsheets/d/1sEESB_3eCFdyMCXRDxP0g2IRZGyvjKZ5v1stcyqQ3Nw/edit?
  // You can also call let ss = SpreadsheetApp.getActiveSpreadsheet() but this is not reccomended when you have a trigger
  const ss = SpreadsheetApp.openById('YOUR_SCRIPTID_HERE');

  //the tab labeled Form Responses 1
  let sheet = ss.getSheetByName('YOUR_SHEET_NAME_HERE');

  //the data in the sheet
  let data = sheet.getDataRange().getValues();

  //declaring the variable to store the answers
  let row;

  /**
  * checking to see if the form was submitted.  if the form is submitted the form send them to
  * apps script in the form of an event object(e).  The answers are kept in e.values.
  */
  if(e && e.values.length>0){
    console.log(JSON.stringify(e))
    row = e.values;
  }
  //for use in testing.  This will get the last row submitted
  else{
    row = data[data.length-1];
  }

  //this is me checking to see if it is pulling the data
  console.log(row);


  //assign the answers to variables

  //this puts the date into a format of our choosing
  let formSubmitDate = Utilities.formatDate(new Date(row[0]),"IST","MMM dd, yyyy hh:mm a")
  let email = row[1];
  let firstName = row[2];
  let lastName = row[3];
  let favoriteFood = row[4];
  //this splits the answers into an array of values.  it there is only one answer, its value will be in arr[0]
  let likableAnimals = row[5].split(", ");

  let subject = `Thank you ${firstName} for submitting that form`;
  let body = `<p>You submitted the following answers:</p>
              <p>Favorite food:</p>
              <ul>
                <li>${favoriteFood}</li>
              </ul>
              <p>You like the following animals:</p>
              <ul>`;
//this will loop through each animal they liked and add list item for each
  for(let i=0;i<likableAnimals.length;i++){
    body = body + `<li>${likableAnimals[i]}</li>`
  }

  body = body + '</ul>';

  //try to send the email
  try{
    GmailApp.sendEmail(email,subject,body,{
      htmlBody:body, //sets the text of the body to an HTML email
      noReply:true //sends the message from a google No Reply account
    });
  }
  //or catch and error and do something with it
  catch(err){
    console.log(`I couldnt send the email because of the following error: ${err.message}`)
  }
  
  
}

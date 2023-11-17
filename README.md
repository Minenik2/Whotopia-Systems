# Whotopia Systems

This project is for the class IN5320, where we have used the DHIS2 platform and libraries in order to create an application for stock management within Health Services.

## Functionality

Our application functionality is divided into 3 separate tabs found in the navigation bar to the left of the webpage:

### Commodity Inventory

An alphabetically ordered overview of all the current stock within the store (all commodities + their current amount at the location)

- This overview is also searchable using the connected search bar.

#### How is this made?

The data of the location's commodities and current stock is collected and displayed using the DHIS2 API. The searching functionality is connected to the displayName of the commodities, where the table only displays commodities containing a "filterword" (input in the searchbar) if something is entered.

### Register Transaction

Allowing the user to register transactions within the store including both dispensing commodities to recipients, and receiving more stock.

- Contains _additional requirement 1 - store management (MVP)_: update stock balance, update commodity dataset and record the transaction
  - We consider this to be a basic requirement for a stock management application.
- Contains _additional requirement 4 - improved management of commodity recipients (MVP)_: medical personnel is stored in the database, integrated into registering transactions in order to autocomplete recipients for more efficiency and a reduced likelihood of input mistakes.

Displays the current stock and future stock of the selected commodity for a better user experience and comprehensivity.
User can edit date/time of transaction as internet access may not be stable at all times or to allow for other issues with more flexibility.

#### How is this made?

Using the customized DHIS2 UI, we have implemented a navigation tab in order to switch between dispensing and receiving commodities, where the information shown is dependent on what tab is currently active.\
Using this currently active tab, we also differentiate between whether the transaction should be a subtraction (dispensing) or an addition (receiving) to the stock.\
We have used our own folder in the DataStore section of the DHIS2 API to add a key for _users_ (IN5320-<3>/USERS), containing medical personnel. This list of users is used for filling in recipients within transaction registering. Users cannot enter a recipient that is not already in this list. **Note:** We have not added functionality to add users to this list as that is not included in our interpretation of additional requirement 4.\
In this same DataStore API, we have a key storing all transactions when a transaction is registered and submitted (IN5320-<3>/Transactions). This API is also used for displaying the transactions in the Transaction History tab.

### Transaction History

An overview of all the transactions taken place at the location, with the latest on top. This overview has 2 different modes: **List View** and **Table View**, with **List View** being the default. These modes can be switched between, using the button above the view. The text within the button changes depending on the view for more comprehensibility.

- List View: Clicking on a transaction makes it expand and allows the user to see more details about the chosen transaction, showing only what is necessary.
- Table View: All of the details are shown in a large table.

#### How is this made?

Data is collected and displayed in a list from the DataStore API key "transactions". When one of these elements is clicked, a table is created displaying more details of the transaction.\
 in **List View**, the details of the element is collected depending on the clicked element using a useState "selectedItem".\
 In **Table View**, all of the stored data within the dataStore API "IN5320-<3>/Transactions" is mapped through and displayed in a table.

## Challenges, Known Issues and Missing Functionality

#### Known issue 1: Adding Multiple Commodities (Multiple-Commodities-Deprecated branch)

Using the 'ReactFinalForm' system from the DHIS2 documentation, we attempted to implement multiple commodities. There were multiple challenges we faced when implementing this. Firstly, we had to make sure to update our API database system to be able to store multiple commodities in a single push. Secondly, the way we showcased transaction history was designed for a single commodity entry. We created an array list of commodities where you can store and add commodities. Using the 'Add commodity' button, the user will be able to add a new commodity to the list. Our thought process was that when the user selects a commodity, it would automatically update the chosen stock value, input and 'amount after transaction' as values into the specified commodity in the array. What happened in reality was that the onChange parameter from the DHIS2 library for SingleSelectFF did not work according to our intentions. If you put the method into it, it would not run.

Therefore, you would have to invoke the method in the onChange={method()} for it to work. This was a workaround solution. Another workaround solution that was implemented as a result from the onChange parameter not working according to our wishes, was to add an EventListener with a method that reads the selected Select.InnerHTML target to find out what label the user has selected. An issue is that onChange is called on every 'SingleSelectFieldff' component in the file, causing it to run equal to the amount of times the user has added new commodities with the 'Add commodity' button. The onChange method runs multiple times, meaning that the current stock will change the stock of every single commodity to the same commodity's stock. We discussed solving the problem using keys or indexes and having that each time the onChange method runs, it would also run with the specific index that it is supposed to change that stock amount on.

In the end, the major problem was still onChange being called for every single SingleSelectFF component that is on the file. Therefore, it only called the method with the unique parameters, via the label that the user has selected. We retrieved all this information using event.target.innerhtml instead, seeing that the onChange parameters for the string and event did not work. When we tried to implement the method how it is supposed to be, the method would not run. However, if it did in theory run how it was supposed to run, we believe many of these challenges would be solved. Ultimately, we decided not to implement this functionality due to time constraints and to prioritize other functions. The last working code is located on the Multiple-Commoditites-deprecated branch and is the last working version before changing resources to focus on other functions.

#### Known issue 2: Can submit changes to commodity multiple times in a row

All information in the form will be retained after submitting changes to a commodity. This will make it possible for a user to spam the Submit button, which is not an intended function. The form should preferably reset all information upon pressing the Submit button, thus making it impossible for a user to spam this button.

#### Known issue 3: "Commodities changed" notification only shows up once

If a user has submitted changes to a commodity, a notification will appear to notify and confirm to user that changes have been made successfully. If the user submits other commodities later, this notification will no longer show up after pressing the Submit button. The notification will only re-appear upon re-loading the website.

#### Known issue 4: Box containing additional details of a transaction does not have a fixed position

A user can have a very long transaction history (see Transaction History). If the user scrolls far down and clicks on a transaction for more details, the box containing additional details will only be visible from the very top of the page, forcing the user to scroll to the top. A possible solution for this is to implement pagination for Transaction History to reduce scrolling, or to give the box containing additional details a fixed position.

#### Missed idea: Sorting system

We also wanted to add a functionality to commodity tab letting us sort alphabetically & by biggest/lowest amount. Sadly, due to time constraints we could not achieve this.

#### Missed idea: Pagination

We also wanted to add Pagination to the tables showcasing commodities and transactions - especially in the Transaction History, since it can quickly become quite long. However, we were unsure of how to do this based on the <Pagination> documentation, and also due to a lack of time and prioritizing other functionality, we were not able to add this functionality.

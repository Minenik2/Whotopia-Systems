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

Allowing the user to register transactions within the store including both dispensing commodities to recipients, and recieving more stock.

- Contains _additional requirement 1 - store management (MVP)_: update stock balance, update commodity dataset and record the transaction
  - We consider this to be a basic requirement for a stock management application.
- Contains _additonal requirement 4 - improved management of commodity recipients (MVP)_: medical personnel is stored in the database, integrated into registering transactions in order to autocomplete recipients for more efficiency.

Displays the current stock and future stock of the selected commodity for a better user experience and comprehensivity.
User can edit date/time of transaction as internet access may not be stable at all times or to allow for other issues with more flexibility.

#### How is this made?

Using the customized DHIS2 UI, we have implemented a navigation tab in order to switch between dispensing and receiving commodities, where the information shown is dependent on what tab is currently active.\
Using this currently active tab, we also differentiate between whether the transaction should be a subtraction (dispensing) or an addition (receiving) to the stock.\
We have used our own folder in the DataStore section of the DHIS2 API to add a key for _users_, containing medical personnel. This list of users is used for filling in recipients within transaction registering. Users cannot enter a recipient that is not already in this list. **Note:** We have not added functionality to add users to this list as that is not included in our interpretation of additional requirement 4.\
In this same DataStore API, we have a key storing all transactions when a transaction is registered and submitted. This API is also used for displaying the transactions in the Transaction History tab.\

### Transaction History

An overview of all the transactions taken place at the location, with the latest on top.

- Clicking on a transaction makes it expand and allows the user to see more details about the chosen transaction.

#### How is this made?

Data is collected and displayed in a list from the DataStore API key "transactions". When one of these elements is clicked, a table is created displaying more details of the transaction. The details of the element is collected depending on the clicked element using a useState "selectedItem".

#### Missing functionality: Pagination
We also wanted to add Pagination to the tables showcasing commodities and transactions - especially in the Transaction History, since it can quickly become quite long. However, we were unsure of how to do this based on the <Pagination> documentation, and also due to a lack of time and prioritizing other functionality, we were not able to add this functionality. 

### Challenges: Adding Multiple Commodities (Multiple-Commodities-Depricated branch)

Using the 'ReactFinalForm' system from dhis2 documentation, we tried to implement multiple commodities. There are different challenges with we faced when implementing this, firstly we need to make sure to update our API database system to be able to store multiple commodities in a single push, secondly the way we showcased transaction history was designed for a single commodity entry. We designed a commodity arraylist were you can store and add commodities, true the 'new commodity' button the user would make a new commodity into the list. The tought process would be that when the user selects a commodity, it would automatically update the chosen stock value, input and 'amount after transaction' as values into the specified commodity in the array. What happend in reality is that the onChange parameter in the dhis2 library for singleselectff did not work properly, if you would just normally put the method into it, it would not run at all, therefore you would have to invoke the method in the onChange={method()} instead for it to work. This was a workaround and a way to solve the problem, another problem comes up, because the onchange does not work as intended we have an an eventlistener with a method that reads the selected select.innerhtml target to find out what label the user selected. The problem is that this onchange is called on every 'SingleSelectFieldff' component in the document leaving it to having to run equal to the amount of times the user made new commodities with the new commodity button. This onchange method that runs multiple times meaning that the current stock will change on every single commodity to the same commodity. There was a though of solving the problem with keys or indexes and having that each time the onChange method would run, it would also run with a specific index that it is supposed to change that stock amount for. But in the end the problem is still that the onchange is called for every single singleselectff component therefore it just called the method with the unique parameters, with the label that the user selected, which we read true the event.target.innerhtml because the onchange parameteres for the string and the event did not work at all. If you would make the method how it is supposed to be the method would not run, however if it did in theory run how it was supposed to, then everything would be solved. Having read the documentation multiple times and asked for help we decided to not implement this functionality into our app because of time contrains. The last working code is located on the Multiple-Commoditites-depricated branch, it is the last working version before changing the resources to focus on other intentions.

#### Missed idea: sorting system

We also wanted to add a functionality to commodity tab letting us sort alphabetically & by biggest/lowest amount. Sadly, due to time constraints we could not achieve this.

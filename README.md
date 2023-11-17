Readme should include:
Your app's functionality
How this is implemented (just a brief explanation)
Any missing functionality/implementations, and things that do not work optimally.

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
- Contains _additional requirement 9 - manage bulk operations (extra)_: allowing users to register transactions with several commodities at once for more efficiency.

Displays the current stock and future stock of the selected commodities for a better user experience and comprehensivity.
User can edit date/time of transaction as internet access may not be stable at all times or to allow for other issues with more flexibility.

#### How is this made?

Using the customized DHIS2 UI, we have implemented a navigation tab in order to switch between dispensing and receiving commodities, where the information shown is dependent on what tab is currently active.\
Using this currently active tab, we also differentiate between whether the transaction should be a subtraction (dispensing) or an addition (receiving) to the stock.\
We have used our own folder in the DataStore section of the DHIS2 API to add a key for _users_, containing medical personnel. This list of users is used for filling in recipients within transaction registering. Users cannot enter a recipient that is not already in this list. **Note:** We have not added functionality to add users to this list as that is not included in our interpretation of additional requirement 4.\
In this same DataStore API, we have a key storing all transactions when a transaction is registered and submitted. This API is also used for displaying the transactions in the Transaction History tab.\
//TODO: Additional requirement 9

### Transaction History

An overview of all the transactions taken place at the location, with the latest on top.

- Clicking on a transaction makes it expand and allows the user to see more details about the chosen transaction.

#### How is this made?

Data is collected and displayed in a list from the DataStore API key "transactions". When one of these elements is clicked, a table is created displaying more details of the transaction. The details of the element is collected depending on the clicked element using a useState "selectedItem".

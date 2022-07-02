# Setup

yarn start or npm run start

# Build

yarn build or npm run stabuildrt

# Explanation

This repo was built, based on the assessment found here
https://github.com/ElevateSecurity/technical-interview/blob/master/Frontent.md

This app is processes mockData and then displays Employee Incidents, based on a severity of low, medium, high or critical

# Overall Approach

It appeas the mock api server has not been setup for cors. I was able to hit all the api's using postman, but ran into cors issues when attempting to do so through the web.
I reached out to Joe Hayes and Katie Selman regarding the issues and was told to just send what I had.

Instead I grouped the data from postman and put it into a mock data file and went on with the assessment.

As I was waiting to hear back regarding the Cors issues, I processed the data with multiple looping. When the amount of looping became apparent, I considered off loading all of the work onto a web worker, but, in not being sure what was happening with the mock server, I just went ahead and wrote the code to process the data like it would be processed when it all came back from the server.

Some points in writing this, taken from the requirements:

"Must query security incidents via HTTP"
Able to do so with Postman, but not from the web.

"Must group results by employee_id, and group incidents by priority level for each employee_id"
This was done, but I did not follow the sample structure.  
It was not included in the assessment sent to me, but I saw the backend assessment, where the JSON was structured like this, with the key being an employee id
{
"123456":{
.....
}
}

When it came time to render some data, this wouuld have led to having to iterate over the object each time, to find the keys (employeeIds) and then access the data directly.
With JavaScript only having one thread, and their being 300 employee, it would have led to a lot of overhead and slowed things down.
I chose instead to create a different structure, where I gathered all employee incidents and put them into an array of objects, with a format like this:

{
"empId": 732618,
"priorities": {
"low": {
"count": 0,
"incidents": []
},
"medium": {
"count": 1,
"incidents": [
{
"priority": "medium",
"reported_by": 732618,
"timestamp": 1655585148.689005,
"source_ip": "192.135.85.197",
"type": "denial"
}
]
},
"high": {
"count": 0,
"incidents": []
},
"critical": {
"count": 0,
"incidents": []
}
}
}

This allowed me to iterate through the data faster, than having to do so through an object.

"...New incidents should take at most an hour to be reflected in the results from your new endpoint."
As I was unable to retrieve data from the server, I was not able to write this. That being said, I would have had to look into writing something to keep track of time and then
posting for new data. Or better yet, if it had been provided, setup a websocket with the server and check for data that way.

"...Must visualize results almost immediately (~ 1 second)."
I cannot say for sure if this would have happened, when hitting apis that were susceptible to failing, then the processing of the large amount of data sent back and then having React
render the data. Honestly, I'm not sure this was a practical ask.

"...Please note that the endpoints themselves take several seconds to return data, and might sometimes fail."
I had planned on using axios-retry, in case an api request failed.

# Enhancements, if needed to run in production

I got the impression that this was original an assessment for sql. The taks of pulling data, normalizing fields, grouping and sorting would have been perfect for a database.
Then I thought, ok, 2nd best option, pull 3rd party data and any data from the db, and then do the sorting and merging in the back end, and send efficient JSON for the front end to consume and render data by.

For a better UX, I'd have the data processed on the server, and sent out in a small chunk. The projec could then focus on rendering data and not processing large amounts of data.
Setup a web socket if possible, and retrieve chunks of data as needed.
If it came down to having to store a lot of data in a store, I would also look at implementing a web worker that had it's own store, and have it act like Redux for example.
It could hold the data and pass back what is needed when a user interacts.  
Even going so far as to implement a web socket, inside a web worker.

Make the web worker the source of truth, and unload the overhead of fetching, maintaining and processing data as required.

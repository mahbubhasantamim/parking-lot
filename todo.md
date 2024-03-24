we would like you to develop production-grade working solution using NodeJs for the following problem statement:

Develop a parking lot application where we should be able perform following operations:

1. Parking manager can create parking lots with desired parking spaces/slots in each parking lot.
2. User (Vehicle owner) can choose any parking lot & can park his vehicle in the nearest parking slot available in that lot (eg if parking slots are numbered 1,2,3....n, then we still start from 1 and pick the one that is available)
3. User can unpark his vehicle
4. When user unparks, response should be success along with the parking fee that will be calculated as Rs. 10 _ Number of hours the vehicle has been parked. eg If parked for 1 hour 5 minutes , it will be 10 _ 2 = 20
5. Parking manager can view his current parking lot status (eg which cars are parked in which slots)
6. Parking manager can put any parking space/slot into maintenance mode and back to working state at any time.
7. Parking Manager should be able to get total number of vehicles parked on any day, total parking time and the total fee collected on that day.

Please develop all the apis required for above features using RDBMS of your choice and take necessary assumptions. Feel free to reach out in case of any clarifications.

Evaluation will be based on how close the solution is to the requirements, code quality, api design, database design & extensibility in terms of adding new features

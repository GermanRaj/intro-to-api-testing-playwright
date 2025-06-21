| #   | PUT/DELET/GET CHECKLIST                                                   | Testing data    |
| --- | ------------------------------------------------------------------------- | --------------- |
| 1   | Correct answer with Put function and valid ID                             | 1, 5, 10        |
| 2   | Correct answer with Put function and invalid ID                           | 0,11            |
| 3   | Correct answer with Put function and Missing ID                           | NULL            |
| 4   | Correct Answer with Delete Function and correct ID                        | 1, 5, 10        |
| 5   | Correct Answer with Delete Function and invalid ID                        | 0, 11,          |
| 6   | Correct Answer with Delete Function and Missing ID                        | NULL            |
| 7   | Correct Answer with Delete Function and Incorrect Type of ID              | "aa"            |
| 9   | Correct Answer with Get Function and Valid Params of Username&Passsword   | 'Germans','asd' |
| 10  | Correct Answer with Get Function and Missing Params of Username&Passsword | NULL            |
| 11  | Correct Answer with Get Function and Missing Param Password               | 'Germans', NULL |
| 12  | Correct Answer with Get Function and Missing Param of Username            | NULL , 'asd'    |

| #   | LOAN RISK CHECKLIST                                                                        | Testing Data |
| --- | ------------------------------------------------------------------------------------------ | ------------ |
| 1   | Succesfull Calculation of Loan Risks with valid Data and recieved Risks Levels (Random)    | VALID DATA   |
| 2   | Succesfull Calculation of Loan Risks with valid Data and recieved Decision Answer (Random) | VALID DATA   |
| 3   | Succesfull Calculation of Loan Risks with Valid Data and recieved Risk Score > 0 (Random)  | Positive Num |
| 4   | Succesfull Calculation of Loan Risks with Valid Data and recieved Income > 0 (Random)      | Num > 0      |
| 5   | Succesfull Calculation of Loan Risks with Valid Data and recieved Age >= 16 (Random)       | Num >= 16    |
| 6   | Failed Calculation of Loan Risks with negative loanAmount and recieved status 400          | -200         |
| 7   | Failed Calculation of Loan Risks with negative Age and recieved status 400                 | -10          |
| 8   | Failed Calculation of Loan Risks with Age = 0 and recieved status 400                      | 0            |
| 9   | Failed Calculation of Loan Risks with Income = 0 and recieved status 400                   | 0            |
| 10  | Failed Calculation of Loan Risks with loanPeriod = 0 and recieved status 400               | 0            |
| 11  | Failed Calculation of Loan Risks with loanPeriod = 0 and recieved status 400               | -10          |

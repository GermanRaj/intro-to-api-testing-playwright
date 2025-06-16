| #  | Name                                                           | Testing data     |
|----|----------------------------------------------------------------|------------------|
| 1  | Correct answer with Put function and valid ID                  | 1, 5, 10         |
| 2  | Correct answer with Put function and invalid ID                | 0,11             |
| 3  | Correct answer with Put function and Missing ID                | NULL             |
| 4  | Correct Answer with Delete Function and correct ID             | 1, 5, 10         |
| 5  | Correct Answer with Delete Function and invalid ID             | 0, 11,           |
| 6  | Correct Answer with Delete Function and Missing ID             | NULL             |
| 7  | Correct Answer with Delete Function and Incorrect Type of ID   | "aa"             | 
| 9  | Correct Answer with Get Function and Valid Params of Username&Passsword | 'Germans','asd'  |
| 10 | Correct Answer with Get Function and Missing Params of Username&Passsword | NULL             |
| 11 | Correct Answer with Get Function and Missing Param Password    | 'Germans', NULL  |
| 12 | Correct Answer with Get Function and Missing Param of Username | NULL , 'asd'     |
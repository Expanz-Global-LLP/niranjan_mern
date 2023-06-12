
// Bank User account Open
const NewAccountOpen = async (req, res) => {
  try {
    const { userFirstName, userLastName, UserEmail, Address, PanNo ,AddharCandNo, UserMobile, DOB, accountType } = req.body;

    if (!userFirstName || !userLastName ||!UserEmail ||!Address || !PanNo ||!AddharCandNo || !UserMobile || !DOB ||!accountType) {
      return res.json({ Error: "All input is required...!" });
    }
       
      const isPanExist = await users.findOne({ PanNo: PanNo });
      const isAddharExists = await users.findOne({ AddharCandNo: AddharCandNo });
    const isaccountType = await user.findOne({accountType : accountType})
      if (isPanExist || isAddharExists) {
        if(isPanExist.accountType == accountType){
          console.log("you have already account with us");
        }

        else{
          const date = new Date();
          // Check user is minor or not 
          var diffDays = parseInt((DOB - date) / (1000 * 60 * 60 * 24), 10); 
          if (diffDays >= 18)
          {    
            await users.create({
              userFirstName,
              userLastName,
              UserEmail,
              Address,
              DOB,
              PanNo,
              AddharCandNo,
              Mobile,
              accountType: accountType,
              Created_Date: date,
              Updated_Date: date
            });
            res.status(202).json({ massage: "User Registerd Sucessfully" });
          }
          else{
            return res.json({ Error: "Candidate is minor" });
          
          }
        }
        }
    }
    catch(e){
      console.log(e);
    }
    }


    // user balance check
    const checkBal = async (req, res) => {
  try {
    const { userPin, ATMCardNo } = req.body;

    if (!userPin || !ATMCardNo) {
      return res.json({ Error: "All input is required...!" });
    }

    const AccountDetail = await users.findOne({ ATMCardNo: ATMCardNo });

    if (AccountDetail && AccountDetail.pin === userPin) {
      return res.json({ success: "Your remaining balance is:", balance: AccountDetail.balance });
    } else {
      console.log("Incorrect pin");
      return res.json({ Error: "Incorrect pin" });
    }
        } catch (error) {
            console.log(error);
            res.status(500).json({ Error: "Internal server error" });
        }
        };


    // user balance Withdrawal
    const RedeemBal = async (req, res) => {
      try {
        const { userPin,  ATMCardNo , amount} = req.body;
    
        !ATMCardNo == true ? console.log("Please enter your card"): "";
        !userPin == true ? console.log("Please enter your pin"): "";
        !amount == true ? console.log("Please enter your Amount"): "";
        
        const AccountDetail = await users.findOne({ ATMCardNo : ATMCardNo})
        
        let count = 0;
        if( AccountDetail.pin == userPin){
           if(amount < AccountDetail.amount ){
            AccountDetail.amount=AccountDetail.amount-amount;
            console.log("Withdrawal success");
           }
           else{
            console.log("insufficient balance in your account");
           }
          
        }
        else{
          count++;
          count >= 3 ?console.log("your account is block due to incorrect pin" ): "";
        }
      }
      catch(e){console.log(e)};}
    
//    // user balance deposit
const DepositBal = async (req, res) => {
  try {
    const { AccountNo , amount} = req.body;

    !AccountNo == true ? console.log("Please enter your account no"): "";
    !amount == true ? console.log("Please enter your Amount"): "";
    
    const AccountDetail = await users.findOne({ AccountNo : AccountNo})
    if( AccountDetail){
        AccountDetail.amount = AccountDetail.amount+amount;
        console.log("deposit success");
       }
       else{
        console.log("invalid account");
       }
    }
  catch(e){console.log(e)};}


  // application for loan
  const loanApplication = async (req, res) => {
    try {
      const { userFirstName, userLastName, UserEmail, Address, PanNo ,AddharCandNo, UserMobile, DOB, emailId } = req.body;
  
      if (!userFirstName || !userLastName ||!UserEmail ||!Address || !PanNo ||!AddharCandNo || !UserMobile || !DOB ||!emailId) {
        return res.json({ Error: "All input is required...!" });
      }
         
        const isPanExist = await users.findOne({ PanNo: PanNo });
        const isAddharExists = await users.findOne({ AddharCandNo: AddharCandNo });
      
      const civilscore =  getCivilScore(PanNo, AddharCandNo, UserMobile, DOB, emailId)
       if(civilscore >= 700){
          console.log("your application is submit for the loan request");
       }
       else{
        console.log("your cant apply for loan")
       }
      }
      catch(e){
        console.log(e);
      }
      }
  
// Saving Accounts User List
const allSavingAcountUserList = async (req, result) => {
  try {
    const userList = await users.find(
      { isActive: false, accountType: "saving" },
      function (err, user) {
        if (err) {
          return err;
        }
        if (user) {
          return result.status(200).json({ user });
        }
      }
    );
  } catch (err) {
    console.log(err);
  }
};

// current Accounts User List
const allCurrentAcountUserList = async (req, result) => {
  try {
    const userList = await users.find(
      { isActive: true, accountType: "current" },
      function (err, user) {
        if (err) {
          return err;
        }
        if (user) {
          return result.status(200).json({ user });
        }
      }
    );
  } catch (err) {
    console.log(err);
  }
};


// list of loan
const LoanRequestUserList = async (req, result) => {
  try {
    const userList = await users.find(
      { LoanReqest: true },
      function (err, user) {
        if (err) {
          return err;
        }
        if (user) {

          const Loadstatus = user.loan.status;
          if(Loadstatus == true){
            console.log("Loan Approved :", users);
          }
          else{
            console.log( "Loan Not Approved :", users );
          }
        }
      }
    );
  } catch (err) {
    console.log(err);
  }
};

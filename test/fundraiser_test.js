const assert = require("assert");

const FundraiserContract = artifacts.require("Fundraiser");

contract ("Fundraiser", accounts => {
    let fundraiser;
    const name="Beneficiary Name";
    const url = "beneficiaryname.org";
    const imageURL = "https://placekitten.com/600/350";
    const description = "Beneficiary description";
    const beneficiary=accounts[1];
    const owner=accounts[0];


    xdescribe("Initialisation", () =>{
        beforeEach(async () => {
            fundraiser = await FundraiserContract.new(name,url, imageURL,description,beneficiary,owner);
        });
        it ("gets the beneficiary name", async () =>{
            const actual =await fundraiser.name();
            assert.equal(actual,name,"names should match");
        });

        it ("gets the url", async () =>{
            const actual = await fundraiser.url();
            assert.equal (actual, url, "url should match");
        })

        it("gets the image url", async () =>{
            const actual = await fundraiser.imageURL();
            assert.equal (actual,imageURL, "image url should match");
        })
        it ("gets the description ", async () => {
            const actual = await fundraiser.description();
            assert.equal (actual,description, "description should match");
        })

        it ("gets the beneficiary", async () =>{
            const actual= await fundraiser.beneficiary();
            assert.equal (actual,beneficiary,"beneficiary addresses should match")
        })
        it ("gets the owner", async () =>{
            const actual= await fundraiser.owner();
            assert.equal (actual,owner,"custodian addresses should match")
        });
});

        xdescribe ("SetBeneficiary",  () => {
    const newBeneficiary = accounts[2];

    it("updated the new beneficiary to when called by owner account", async () =>{
        await fundraiser.setBeneficiary(newBeneficiary,{from:owner});
        const actualBeneficiary=await fundraiser.beneficiary();
        assert.equal (actualBeneficiary,newBeneficiary,"beneficiaries should match");
    })

    it ("throws an error if not called by the owner", async ()=>{
        try {
            await fundraiser.setBeneficiary(newBeneficiary,{from:accounts[3]});
            assert.fail ("withdraw is availables for owners only");
        }
        catch (err){
            const expectedError= "Ownable: caller is not the owner";
            const actualError = err.reason;
            assert.equal(actualError,expectedError, "should not be permitted");
        }
    }
    )

})
        xdescribe("make a donation", () => {
            const value=web3.utils.toWei("0.289");
            const donor=accounts[2];
            it("increments myDonationsCount", async () =>{
            const currentDonationsCount= await fundraiser.myDonationsCount({from:donor});
            await fundraiser.donate({from:donor, value});

            const newDonationsCount = await fundraiser.myDonationsCount({from:donor});

            assert.equal(1, newDonationsCount-currentDonationsCount, " myDonationsCount should increment by 1");
            })
            it("includes the donation in myDonations", async () => {
                await fundraiser.donate({from:donor,value});
                const {values,dates} = await fundraiser.myDonations(
                    {from:donor}
                );
                assert.equal(value,values[0],"values should match");
                assert(dates[0], "date should be present");
            });

            it(" increases the totalDonations amount", async () =>{
                const currentTotalDonations= await fundraiser.totalDonations();
                await fundraiser.donate({from:donor, value});
                const newTotalDonations = await fundraiser.totalDonations();

                const diff=newTotalDonations-currentTotalDonations;
                assert.equal (diff,value ,"difference should match the donated value");
            });

            it("increases totalDonations count", async () =>{
                const currentDonations = await fundraiser.donationsCount();
                await fundraiser.donate({from:donor,value});
                const newDonations = await fundraiser.donationsCount();
                assert.equal (1, newDonations - currentDonations,"total donations shoukd increment");
            })
            it("emits the DonationsReceived event", async () => {
                const tx= await fundraiser.donate({from:donor,value});
                const expectedEvent = "donationsReceived";
                const actualEvent= tx.logs[0].event;
                assert.equal (actualEvent, expectedEvent, "events should match");

            });



            })
             xdescribe("withdrawing funds", () =>{
                beforeEach(async ()=> {

                    await fundraiser.donate({from:accounts[2], value:web3.utils.toWei("0.1")}
                    );
                });
                describe("access controls", () => {
                    it("allows only the owner to withdraw", async () =>{
                        try{
                            await fundraiser.withdraw({from:accounts[3]});
                            assert.fail("withdraw available only to owners");
                        }

                        catch(err) {
                            const expectedError="Ownable: caller is not the owner";
                            const actualError=err.reason;
                            assert.equal (expectedError,actualError,"should not be allowed")
                        }
                    });
                    it ("permits the owner to call the function", async () => {
                        try{
                            await fundraiser.withdraw({from:accounts[0]});
                            assert(true, " no errors thrown");
                        }
                        catch (err){
                            assert.fail("should not have thrown an error");
                        }

                    })

                    it("transfers balance to the beneficiary", async() =>{
                        await fundraiser.withdraw({from:owner});

                        const newContractBalance= await web3.eth.getBalance(fundraiser.address);
                        assert.equal(newContractBalance,0,"contract should have 0 balance");


                    });

                    it("emits a withdraw event", async () =>{
                        const tx = await fundraiser.withdraw({from:owner});
                        const expectedEvent= "_withdraw";
                        const actualEvent = tx.logs[0].event;

                        assert.equal(
                            expectedEvent,actualEvent, "events should match"
                        );
                    })

                });

                describe("fallback check to increase total donations amount", () => {
                    const value = web3.utils.toWei("0.05");
                    it ("increases the totalDonation amount", async () =>{
                        const currentTotalDonations= await fundraiser.totalDonations();
                        await web3.eth.sendTransaction({
                            to: fundraiser.address, from:accounts[5], value
                        });
                        const newTotalDonations = await fundraiser.totalDonations();
                        const diff = newTotalDonations-currentTotalDonations;
                        assert.equal (diff,value,"total donations should increment by the value sent ");

                    });

                    it("should increase total donations count",async ()=>{
                        const currentDonationsCount = await fundraiser.donationsCount();
                        await web3.eth.sendTransaction({
                            to: fundraiser.address, from:accounts[5], value
                        });
                        const newDonationsCount = await fundraiser.donationsCount();
                        const diff = newDonationsCount-currentDonationsCount;
                        assert.equal (1,diff, "total number ofdonations  should increment by one");
                        
                    })
                })
                
                })
             




        })


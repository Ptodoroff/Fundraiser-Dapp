const FundraiserContract = artifacts.require("Fundraiser");

contract ("Fundraiser", accounts => {
    let fundraiser;
    const name="Beneficiary Name";
    const url = "beneficiaryname.org";
    const imageURL = "https://placekitten.com/600/350";
    const description = "Beneficiary description";
    const beneficiary=accounts[1];
    const owner=accounts[0];


    describe("Initialisation", () =>{
        beforeEach(async () => {
            fundraiser = await FundraiserContract.new(name,url, imageURL,description,beneficiary,owner);
        });
        it ("gets the beneficiary name", async () =>{
            const actual =await fundraiser.name();
            assert.equal(actual,name,"names should match");
        });

        it ("gets the url", async () =>{
            const actual = await fundraiser.url();
            assert.equal(actual, url, "url should match");
        })

        it("gets the image url", async () =>{
            const actual = await fundraiser.imageURL();
            assert.equal (actual,imageURL, "image url should match");
        })
        it ("gets the description ", async () => {
            const actual = await fundraiser.description();
            assert.equal = await (actual,description, "description should match");
        })

        it ("gets the beneficiary", async () =>{
            const actual=fundraiser.beneficiary();
            assert.equal=await(actual,beneficiary,"beneficiary addresses should match")
        })
        it ("gets the owner", async () =>{
            const actual=fundraiser.owner();
            assert.equal=await(actual,owner,"custodian addresses should match")
        });
});

        describe ("SetBeneficiary",  () => {
    const newBeneficiary = accounts[2];

    it("updated the new beneficiary to when called by owner account", async () =>{
        await fundraiser.setBeneficiary(newBeneficiary,{from:owner});
        const actualBeneficiary=await fundraiser.beneficiary();
        assert.equal=await(actualBeneficiary,newBeneficiary,"beneficiaries should match");
    })

    it ("throws an error if not called by the owner", async ()=>{
        try {
            await fundraiser.setBeneficiary(newBeneficiary,{from:accounts[3]});
            assert.fail ("withdraw is availables for owners only");
        }
        catch (err){
            const expectedError= " Caller is not the Owner";
            const actualError = err.reason;
            assert.equal=await(actualError,expectedError, "should not be permitted");
        }
    }
    )

})
        describe("make a donation", () => {
            const value=web3.utils.toWei("0.289");
            const donor=accounts[2];
            it("increments myDonationsCount", async () =>{
            const currentDonationsCount= await fundraiser.myDonationsCount({from:donor});
            await fundraiser.donate({from:donor, value});

            const newDonationsCount = await fundraiser.myDonationsCount({from:donor});

            assert.equal= await (1, newDonationsCount-currentDonationsCount, " myDonationsCount should increment by 1");
            })
            it("includes the donation in myDonations", async () => {
                await fundraiser.donate({from:donor,value});
                const {values,dates} = await fundraiser.myDonations(
                    {from:donor}
                );
                assert.equal=await (value,values[0],"values should match");
                assert(dates[0], "date should be present");
            });

            it(" increases the totalDonations amount", async () =>{
                const currentTotalDonations= await fundraiser.totalDonations();
                await fundraiser.donate({from:donor, value});
                const newTotalDonations = await fundraiser.totalDonations();

                const diff=newTotalDonations-currentTotalDonations;
                assert.equal = await (diff,value ,"difference should match the donated value");
            });

            it("increases totalDonations count", async () =>{
                const currentDonations = await fundraiser.donationsCount();
                await fundraiser.donate({from:donor,value});
                const newDonations = await fundraiser.donationsCount();
                assert.equal = (1, newDonations - currentDonations,"total donations shoukd increment");
            })
            it("enits the DonationsReceived event", async () => {
                const tx= await fundraiser.donate({from:donor,value});
                const expectedEvent = "Donation Received";
                const actualEvent= tx.logs[0].event;
                assert.equal = await (actualEvent, expectedEvent, "events should match");

            });



            });
        })


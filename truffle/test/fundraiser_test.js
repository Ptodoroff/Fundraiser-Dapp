const FundraiserContract = artifacts.require("Fundraiser");

contract ("Fundraiser", accounts => {
    let fundraiser;
    const name="Beneficiary Name";
    const url = "beneficiaryname.org";
    const imageURL = "https://placekitten.com/600/350";
    const description = "Beneficiary description";
    const beneficiary=accounts[1];
    const custodian=accounts[0];


    describe("Initialisation", () =>{
        beforeEach(async () => {
            fundraiser = await FundraiserContract.new(name,url, imageURL,description,beneficiary,custodian);
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
        it ("gets the custodian", async () =>{
            const actual=fundraiser.custodian();
            assert.equal=await(actual,custodian,"custodian addresses should match")
        });
});
})

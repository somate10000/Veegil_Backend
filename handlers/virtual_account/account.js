const { flw } = require("../../utils/flw");

exports.createVirtualAccount = async (req, res) => {
  const payload = {
    email: "johnmadakin@allstar.com",
    is_permanent: true,
    bvn: "12345678901",
    tx_ref: "jhn-mdkn-101923123463",
  };
  const response = await flw.VirtualAcct.create(payload)
    .then((response) => {
      res.json(response);
      console.log(response.data);
    })
    .catch((err) => console.log(err));
  console.log(response);
};
exports.subVirtualAccount = async (req, res) => {
  const payload = {
    account_name: "John Doe",
    email: "developers@flutterwavego.com",
    mobilenumber: "08090605594",
    country: "NG",
    account_bank: "Access Bank",
    account_number: "0000210624",
    business_name: "wallet4you",
    business_email: "iwvegfuiw@oee.gg",
    business_contact: "dove",
    business_mobile: "08027277473",
    business_contact_mobile: "09037368390",
  };
  const response = await flw.Subaccount.create(payload)
    .then((response) => {
      res.json(response);
      console.log(response.data);
    })
    .catch((err) => console.log(err));
  console.log(response);
};

exports.fetchVirtualAccount = async (req, res) => {
  const payload = {
    order_ref: "URF_1590350605901_4406935", // This is the order reference returned in the virtual account number creation
  };
  const response = await flw.VirtualAcct.fetch(payload)
    .then((response) => {
      res.json(response);
      console.log(response.data);
    })
    .catch((err) => console.log(err));
  console.log(response);
};

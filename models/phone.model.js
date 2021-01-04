let phones = require("../data/phones.json");
const filename = "./data/phones.json";
const helper = require("../helpers/helper.js");

function getPhones() {
  return new Promise((resolve, reject) => {
    if (phones.length === 0) {
      reject({
        message: "no phones available",
        status: 202,
      });
    }

    resolve(phones);
  });
}

function getPhone(id) {
  return new Promise((resolve, reject) => {
    helper
      .mustBeInArray(phones, id)
      .then((phone) => resolve(phone))
      .catch((err) => reject(err));
  });
}

function insertPhone(newPhone) {
  return new Promise((resolve, reject) => {
    const id = { id: helper.getNewId(phones) };
    newPhone = { ...id, ...newPhone };
    phones.push(newPhone);
    helper.writeJSONFile(filename, phones);
    resolve(newPhone);
  });
}

function updatePhone(id, newPhone, file) {
  return new Promise((resolve, reject) => {
    helper
      .mustBeInArray(phones, id)
      .then((phone) => {
        const index = phones.findIndex((p) => p.id == phone.id);
        id = { id: phone.id };
        image = phone.imageFileName;
        if (file) {
          const imageFileName = `http://localhost:8080/uploads/${file.filename}`;
          phones[index] = { ...id, ...newPhone, imageFileName };
        } else {
          phones[index] = { ...id, ...newPhone, imageFileName: image };
        }
        helper.writeJSONFile(filename, phones);
        resolve(phones[index]);
      })
      .catch((err) => reject(err));
  });
}

function deletePhone(id) {
  return new Promise((resolve, reject) => {
    helper
      .mustBeInArray(phones, id)
      .then(() => {
        phones = phones.filter((p) => p.id != id);
        helper.writeJSONFile(filename, phones);
        resolve();
      })
      .catch((err) => reject(err));
  });
}

module.exports = {
  insertPhone,
  getPhones,
  getPhone,
  updatePhone,
  deletePhone,
};

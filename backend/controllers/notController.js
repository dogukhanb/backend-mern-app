const notModel = require("../models/notModels");

const mongoose = require("mongoose");

const notOlustur = async (req, res) => {
  const { baslik, aciklama } = req.body;
  try {
    const not = await notModel.create({ baslik, aciklama });
    res.status(200).json(not);
  } catch (error) {
    res.status(400).json({ hata: error.message });
  }
};

const notlarGetir = async (req, res) => {
  const notlar = await notModel.find().sort({
    createdAt: -1,
  });
  res.status(200).json(notlar);
};

const notGetir = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ hata: "ID Geçersiz" });
  }
  const not = await notModel.findById(id);
  if (!not) {
    return res.status(404).json({ hata: "Not Bulunamadı" });
  }
  res.status(200).json(not);
};

const notSil = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ hata: "ID Geçersiz" });
  }
  const not = await notModel.findOneAndDelete({ _id: id });
  if (!not) {
    return res.status(404).json({ hata: "Not Bulunamadı" });
  }
  res.status(200).json(not);
};

const notGuncelle = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ hata: "ID Geçersiz" });
  }
  const not = await notModel.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    },
    { new: true }
  );
  if (!not) {
    return res.status(404).json({ hata: "Not Bulunamadı" });
  }
  res.status(200).json(not);
};

module.exports = {
  notOlustur,
  notlarGetir,
  notGetir,
  notSil,
  notGuncelle,
};

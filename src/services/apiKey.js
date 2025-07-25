import ApiKey from "../models/apiKey.js";

export const updateApiKeyByEmail = async (email, hashedKey) => {
  const filter = { owner: email };
  const update = { keyHash: hashedKey, $inc: { activations: 1 } };
  const result = await ApiKey.findOneAndUpdate(filter, update, {
    new: true,
  });
  return result;
};

export const saveApiKeyByEmail = async (email, hashedKey) => {
  const data = {
    owner: email,
    keyHash: hashedKey,
  };
  const result = await ApiKey.create(data);
  return result;
};

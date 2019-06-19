/* eslint-disable no-param-reassign */
import { types } from "mobx-state-tree";

export const ChildStore = types
  .model("ChildStore", {
    genderIndex: types.number,
    firstName: types.string,
    lastName: types.string,
    birthDate: types.string,
    birthHistory: types.string,
    surgicalHistory: types.string,
    currentMedications: types.string,
    hospitalizations: types.string,
    currentMedicalConditions: types.string,
    allergies: types.array (types.string)
  })
  .actions(self => ({
    setGenderIndex(value) {
      self.genderIndex = value;
      return self;
    },
    setFirstName(value) {
      self.firstName = value;
      return self;
    },
    setLastName(value) {
      self.lastName = value;
      return self;
    },
    setBirthDate(value) {
      self.birthDate = value;
      return self;
    },
    setBirthHistory(value) {
      self.birthHistory = value;
      return self;
    },
    setSurgicalHistory(value) {
      self.surgicalHistory = value;
      return self;
    },
    setCurrentMedications(value) {
      self.currentMedications = value;
      return self;
    },
    setHospitalizations(value) {
      self.hospitalizations = value;
      return self;
    },
    setCurrentMedicalConditions(value) {
      self.currentMedicalConditions = value;
      return self;
    },
    setAllergies(value) {
      self.allergies.replace(value);
      return self;
    }
  }));

export default ChildStore;

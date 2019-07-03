/* eslint-disable no-param-reassign */
import { types } from "mobx-state-tree";

export const ChildStore = types
  .model("ChildStore", {
    id: types.number,
    gender: types.string,
    name: types.string,
    first_name: types.string,
    last_name: types.string,
    dob: types.string,
    birth_history: types.optional(types.string, ""),
    surgical_history: types.optional(types.string, ""),
    current_medications: types.optional(types.string, ""),
    hospitalizations: types.optional(types.string, ""),
    current_medical_conditions: types.optional(types.string, ""),
    allergies: types.string
  })
  .actions(self => ({
    setGender(value) {
      self.gender = value;
      return self;
    },
    setName(value) {
      self.name = value;
      return self;
    },
    setFirstName(value) {
      self.first_name = value;
      return self;
    },
    setLastName(value) {
      self.last_name = value;
      return self;
    },
    setBirthDate(value) {
      self.dpb = value;
      return self;
    },
    setBirthHistory(value) {
      self.birth_history = value;
      return self;
    },
    setSurgicalHistory(value) {
      self.surgical_history = value;
      return self;
    },
    setCurrentMedications(value) {
      self.current_medications = value;
      return self;
    },
    setHospitalizations(value) {
      self.hospitalizations = value;
      return self;
    },
    setCurrentMedicalConditions(value) {
      self.current_medical_conditions = value;
      return self;
    },
    setAllergies(value) {
      self.allergies = value;
      return self;
    }
  }));

export default ChildStore;

/* eslint-disable no-param-reassign */
import { types } from "mobx-state-tree";

export const VisitsStore = types
  .model("VisitsStore", {
    visits: types.array (
      types.model({
        id: types.number,
        childId: types.number,
        addressId: types.number,
        reason: types.string,
        symptoms: types.array (types.string),
        appointmentTime: types.Date,
        parentNotes: types.string,
        paymentAmount: types.number
      })
    )
  })
  .actions(self => ({
    setID(value) {
      self.id = value;
      return self;
    },
    setChildID(value) {
      self.childId = value;
      return self;
    },
    setAddressID(value) {
      self.addressId = value;
      return self;
    },
    setReason(value) {
      self.reason = value;
      return self;
    },
    setSymptoms(value) {
      self.symptoms.replace(value);
      return self;
    },
    setAppointmentTime(value) {
      self.appointmentTime = value;
      return self;
    },
    setParentNotes(value) {
      self.parentNotes = value;
      return self;
    },
    setPaymentAmount(value) {
      self.paymentAmount = value;
      return self;
    }
  }));

export default VisitsStore;

/* eslint-disable import/no-named-as-default */
/* eslint-disable no-param-reassign */
import { types } from "mobx-state-tree";

export const VisitRequestStore = types
  .model("VisitRequestStore", {
    symptoms: types.array(types.string, ""),
    reason: types.string,
    pickedChild: types.number,
    pickedAddress: types.number,
    date: types.string,
    time: types.number,
    cost: types.number
  })
  .actions(self => ({
    clear() {
      self = {
        symptoms: [""],
        reason: "",
        pickedChild: 1,
        pickedAddress: 1,
        date: "",
        time: 0,
        cost: 150
      };
      return self;
    },
    setVisitRequestSymptoms(value) {
      self.symptoms.replace(value);
      return self;
    },
    setVisitRequestReason(value) {
      self.reason = value;
      return self;
    },
    setVisitRequestPickedChild(value) {
      self.pickedChild = value;
      return self;
    },
    setVisitRequestPickedAddress(value) {
      self.pickedAddress = value;
      return self;
    },
    setVisitRequestDateTime(date, time) {
      self.date = date;
      self.time = time;
      return self;
    }
  }));

export default VisitRequestStore;

import GoogleFit, {Scopes} from 'react-native-google-fit';

export function getSteps(options, i, callback) {
  GoogleFit.getDailyStepCountSamples(options)
    .then((res) => {
      var result = res.filter(
        (obj) => obj.source === 'com.google.android.gms:estimated_steps',
      )[0].steps;
      callback(result, i);
    })
    .catch((err) => {
      console.warn(err);
    });
}

export function getCals(options, callback) {
  GoogleFit.getDailyCalorieSamples(options, (err, res) => {
    callback(res);
  });
}

export function getDists(callback) {
  var start = new Date();
  var end = new Date();
  const UTC_OFFSET = start.getTimezoneOffset() / 60;
  start.setHours(0 - UTC_OFFSET, 0, 0, 0);
  end.setHours(23 - UTC_OFFSET, 59, 59, 999);
  const opt = {startDate: start, endDate: end};

  GoogleFit.getDailyDistanceSamples(opt, (err, res) => {
    console.log(res);
  });
}

const apiRequest = () => (
  fetch(`https://raw.githubusercontent.com/openfootball/world-cup.json/master/2018/worldcup.json`)
    .then((res) => {
      if (res.status >= 400) {
        throw Error(res.statusText);
      }

      return res;
    })
);

export function fetchScores() {
  return apiRequest()
    .then((data) => data.json());
};

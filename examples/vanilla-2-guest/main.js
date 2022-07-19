import uixGuest from "@adobe/uix-sdk/guest";

const uix = uixGuest({
  id: "Hypatia",
  debug: process.env.NODE_ENV !== "production",
});

setTimeout(() => {
  uix.register({
    interestingNumbers: {
      commentOn(n) {
        const comments = getComments(n);
        record(n, comments);
        return comments;
      },
    },
  });
}, 3000);

let receivedLargeNumbers = 0;

function getComments(n) {
  if (receivedLargeNumbers === 3) {
    return ["NOLO AMPLIVS VIDERE DE NVMERIS STVLTORVM TUORVM 😤"];
  }
  const comments = [];
  if (n > 9000) {
    receivedLargeNumbers++;
    const roman = convertToRoman(Math.floor(n / 1000));
    comments.push(
      roman.length > 20
        ? "NON SCRIBO QVOD VITA BREVIS"
        : `NVMERVS ILLE ERIT PROPE (${roman})`,
      "ECCE NIMIUM MAGNVS EST"
    );
    if (receivedLargeNumbers === 2) {
      setTimeout(
        () => uix.host.interestingNumbers.furthermore("DESINE HOS MIHI DARE"),
        750
      );
    }
  } else {
    comments.push([`NVMERVS ILLE ERIT ${convertToRoman(n)}`]);
  }
  return comments;
}

function convertToRoman(num) {
  var roman = {
    M: 1000,
    CM: 900,
    D: 500,
    CD: 400,
    C: 100,
    XC: 90,
    L: 50,
    XL: 40,
    X: 10,
    IX: 9,
    V: 5,
    IV: 4,
    I: 1,
  };
  var str = "";

  for (var i of Object.keys(roman)) {
    var q = Math.floor(num / roman[i]);
    num -= q * roman[i];
    str += i.repeat(q);
  }

  return str;
}
const received = [];
function record(number, comments) {
  received.push(`<dt><strong>${number}:</strong></dt>
  ${comments.map((comment) => `<dd>${comment}</dd>`)}</dt>`);

  document.querySelector("#app").innerHTML = `
  <p>I've received ${received.length} numbers:</p>
  <dl>
  ${comments.join("")}
  </dl>
`;
}

document.querySelector("#app").innerHTML = `
  <p>I haven't received a number yet.</p>
`;

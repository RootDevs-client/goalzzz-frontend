// export default function getShortName(name, short = null) {
//   if (!name) {
//     return <p>.....</p>;
//   } else {
//     const wordCount = name.split(' ').length;
//     if (wordCount == 1) {
//       return name;
//     } else if (wordCount == 2) {
//       let words = name.split(' ');
//       let firstLetter = words[0][0];
//       return `${firstLetter}. ${words[1]}`;
//     } else {
//       if (short === null || name === short) {
//         let words = name.split(' ');
//         let firstLetter = words[0][0];
//         return `${firstLetter}. ${words[words.length - 1]}`;
//       } else {
//         return short;
//       }
//     }
//   }
// }

// v1 short name

// export default function getShortName(name, short = null) {
//   if (!name) {
//     return <p>.....</p>;
//   } else {
//     const wordCount = name.split(' ').length;
//     if (wordCount === 1) {
//       return name.length > 8 ? `${name.slice(0, 8)}...` : name;
//     } else if (wordCount === 2) {
//       let words = name.split(' ');
//       let firstLetter = words[0][0];
//       let lastName = words[1];
//       let shortName = `${firstLetter}. ${lastName}`;
//       return shortName.length > 8 ? `${shortName.slice(0, 8)}...` : shortName;
//     } else {
//       if (short === null || name === short) {
//         let words = name.split(' ');
//         let firstLetter = words[0][0];
//         let lastName = words[words.length - 1];
//         let shortName = `${firstLetter}. ${lastName}`;
//         return shortName.length > 8 ? `${shortName.slice(0, 8)}...` : shortName;
//       } else {
//         return short.length > 8 ? `${short.slice(0, 8)}...` : short;
//       }
//     }
//   }
// }

// v2 short name

export default function getShortName(name, short = null) {
  const isWindowDefined = typeof window !== 'undefined';
  const isMobile = isWindowDefined ? window.innerWidth < 576 : false;

  if (!name) {
    return <p>.....</p>;
  } else {
    const wordCount = name.split(' ').length;

    if (wordCount === 1) {
      return isMobile ? `${name.slice(0, 6)}...` : name;
    } else if (wordCount === 2) {
      let words = name.split(' ');
      let firstLetter = words[0][0];
      let lastName = words[1];
      let shortName = `${firstLetter}. ${lastName}`;
      return isMobile ? `${shortName.slice(0, 6)}...` : shortName;
    } else {
      if (short === null || name === short) {
        let words = name.split(' ');
        let firstLetter = words[0][0];
        let lastName = words[words.length - 1];
        let shortName = `${firstLetter}. ${lastName}`;
        return isMobile ? `${shortName.slice(0, 6)}...` : shortName;
      } else {
        return isMobile ? `${short.slice(0, 6)}...` : short;
      }
    }
  }
}

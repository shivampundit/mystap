// scroll to top of window
export const scrollToTop = () => window.scrollTo(0, 0);

// get unique id of device
export const getDeviceId = () => {
  const navigator_info = window.navigator;
  const screen_info = window.screen;
  let uid = navigator_info.mimeTypes.length;
  uid += navigator_info.userAgent.replace(/\D+/g, "");
  uid += navigator_info.plugins.length;
  uid += screen_info.height || "";
  uid += screen_info.width || "";
  uid += screen_info.pixelDepth || "";
  return uid || "";
};

// convert bytes to kb, mb, gb
export const bytesToSize = (bytes) => {
  let sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  if (bytes === 0) return "0 Byte";
  let i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
  return Math.round(bytes / Math.pow(1024, i), 2) + " " + sizes[i];
};

// get image src from project rooms array
export const getProjectImg = (rooms) => {
  let img;
  for (let i = 0; i < rooms?.length; i++) {
    if (rooms[i].images.length > 0) {
      img = rooms[i].images[0].thumbnail;
      break;
    }
  }
  return img;
};

// get color on status base
export const getDropdownColor = (status) => {
  switch (status) {
    case 2:
      return "follow-up";
    case 3:
      return "meeting-schedule";
    case 4:
      return "estimate-sent";
    case 5:
      return "signed-up";
    default:
      return "";
  }
};

export const getImageIndex = (i, projects) => {
  let index;
  for (let key in projects[i].rooms) {
    if (projects[i].rooms[key].length > 0) {
      index = projects[i].rooms[key][0];
      break;
    }
  }
  return index;
};

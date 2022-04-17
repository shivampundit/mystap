import wardrobeImage from "./uploadWardrobeImages.svg";
import { useState } from "react";
const UploadWardrobePhotos = () => {
  const ProjectData = [];
  const [selectedFiles, setSelectedFiles] = useState(
    ProjectData[0] ? ProjectData[0].images : []
  );
  let fileInput = document.getElementById("choose-file");
  let imageContainer = document.getElementById("uploadedImages");
  let totalFiles = document.getElementById("no-of-files");

  function previewUploadedImagesHandler(){
    imageContainer.innerHTML = "";
  }
  const handleImageChange = () => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files).map((file) => file);
      console.log("filesArray: ", filesArray);

      setSelectedFiles(selectedFiles.concat(filesArray));
      console.log(selectedFiles);
      // setSelectedImg(imgArray);
      //   Array.from(e.target.files).map((file) => URL.revokeObjectURL(file));
      //   dispatch(insertImage(currentProject, selectedFiles.concat(filesArray)));
    }
  };

  return (
    <section className="main-section">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-7 text-start mb-4">
            <div className="dash-heading">
              <span className="d-flex justify-content-between">
                <h3>
                  Upload Wardrobe Photos
                  {/* {FIELDS[step].heading} */}
                </h3>
              </span>
              <div className="grate-div" id="uploadWardrobeImagesCard">
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  {/* <i class="fa fa-plus add" aria-hidden="true"></i>
                       <img onClick={onOpenModal} src={upload} alt="pic" /> */}
                  <svg
                    width="142"
                    height="127"
                    viewBox="0 0 142 127"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    // onClick={onOpenModal}
                    style={{ cursor: "pointer" }}
                  >
                    <path
                      d="M11.3068 107.455H13.0682V117.085C13.0682 118.08 12.8338 118.967 12.3651 119.749C11.901 120.525 11.2453 121.138 10.3977 121.588C9.55019 122.033 8.55587 122.256 7.41477 122.256C6.27367 122.256 5.27936 122.033 4.43182 121.588C3.58428 121.138 2.92614 120.525 2.45739 119.749C1.99337 118.967 1.76136 118.08 1.76136 117.085V107.455H3.52273V116.943C3.52273 117.653 3.67898 118.286 3.99148 118.839C4.30398 119.389 4.74905 119.822 5.3267 120.139C5.90909 120.452 6.60511 120.608 7.41477 120.608C8.22443 120.608 8.92045 120.452 9.50284 120.139C10.0852 119.822 10.5303 119.389 10.8381 118.839C11.1506 118.286 11.3068 117.653 11.3068 116.943V107.455ZM16.3583 126.091V111.091H17.9776V112.824H18.1765C18.2996 112.634 18.4701 112.393 18.6879 112.099C18.9104 111.801 19.2276 111.536 19.6396 111.304C20.0562 111.067 20.6197 110.949 21.3299 110.949C22.2485 110.949 23.0581 111.179 23.7589 111.638C24.4596 112.097 25.0065 112.748 25.3995 113.591C25.7925 114.434 25.989 115.428 25.989 116.574C25.989 117.729 25.7925 118.731 25.3995 119.578C25.0065 120.421 24.462 121.074 23.766 121.538C23.07 121.998 22.2674 122.227 21.3583 122.227C20.6576 122.227 20.0965 122.111 19.6751 121.879C19.2537 121.643 18.9293 121.375 18.7021 121.077C18.4748 120.774 18.2996 120.523 18.1765 120.324H18.0344V126.091H16.3583ZM18.006 116.545C18.006 117.369 18.1268 118.096 18.3683 118.726C18.6097 119.351 18.9625 119.841 19.4265 120.196C19.8905 120.546 20.4587 120.722 21.131 120.722C21.8318 120.722 22.4165 120.537 22.8853 120.168C23.3588 119.794 23.7139 119.292 23.9506 118.662C24.1921 118.027 24.3129 117.322 24.3129 116.545C24.3129 115.778 24.1945 115.087 23.9577 114.472C23.7257 113.851 23.373 113.361 22.8995 113.001C22.4308 112.637 21.8413 112.455 21.131 112.455C20.4492 112.455 19.8763 112.627 19.4123 112.973C18.9483 113.314 18.5979 113.792 18.3612 114.408C18.1244 115.018 18.006 115.731 18.006 116.545ZM30.2219 107.455V122H28.5458V107.455H30.2219ZM37.7237 122.227C36.7389 122.227 35.8748 121.993 35.1314 121.524C34.3928 121.055 33.8151 120.4 33.3984 119.557C32.9865 118.714 32.7805 117.729 32.7805 116.602C32.7805 115.466 32.9865 114.474 33.3984 113.626C33.8151 112.779 34.3928 112.121 35.1314 111.652C35.8748 111.183 36.7389 110.949 37.7237 110.949C38.7086 110.949 39.5703 111.183 40.3089 111.652C41.0523 112.121 41.63 112.779 42.0419 113.626C42.4586 114.474 42.6669 115.466 42.6669 116.602C42.6669 117.729 42.4586 118.714 42.0419 119.557C41.63 120.4 41.0523 121.055 40.3089 121.524C39.5703 121.993 38.7086 122.227 37.7237 122.227ZM37.7237 120.722C38.4718 120.722 39.0874 120.53 39.5703 120.146C40.0533 119.763 40.4107 119.259 40.6428 118.634C40.8748 118.009 40.9908 117.331 40.9908 116.602C40.9908 115.873 40.8748 115.194 40.6428 114.564C40.4107 113.934 40.0533 113.425 39.5703 113.037C39.0874 112.649 38.4718 112.455 37.7237 112.455C36.9756 112.455 36.3601 112.649 35.8771 113.037C35.3942 113.425 35.0367 113.934 34.8047 114.564C34.5727 115.194 34.4567 115.873 34.4567 116.602C34.4567 117.331 34.5727 118.009 34.8047 118.634C35.0367 119.259 35.3942 119.763 35.8771 120.146C36.3601 120.53 36.9756 120.722 37.7237 120.722ZM48.4357 122.256C47.7444 122.256 47.1171 122.125 46.5536 121.865C45.9902 121.6 45.5427 121.219 45.2113 120.722C44.8799 120.22 44.7141 119.614 44.7141 118.903C44.7141 118.278 44.8372 117.772 45.0835 117.384C45.3297 116.991 45.6587 116.683 46.0707 116.46C46.4826 116.238 46.9371 116.072 47.4343 115.963C47.9362 115.849 48.4405 115.759 48.9471 115.693C49.61 115.608 50.1474 115.544 50.5593 115.501C50.976 115.454 51.279 115.376 51.4684 115.267C51.6625 115.158 51.7596 114.969 51.7596 114.699V114.642C51.7596 113.941 51.5678 113.397 51.1843 113.009C50.8055 112.62 50.2302 112.426 49.4585 112.426C48.6583 112.426 48.0309 112.601 47.5763 112.952C47.1218 113.302 46.8022 113.676 46.6175 114.074L45.0266 113.506C45.3107 112.843 45.6895 112.327 46.163 111.957C46.6412 111.583 47.1621 111.323 47.7255 111.176C48.2937 111.025 48.8524 110.949 49.4016 110.949C49.752 110.949 50.1545 110.991 50.609 111.077C51.0683 111.157 51.511 111.325 51.9371 111.581C52.368 111.837 52.7255 112.223 53.0096 112.739C53.2937 113.255 53.4357 113.946 53.4357 114.812V122H51.7596V120.523H51.6744C51.5607 120.759 51.3713 121.013 51.1062 121.283C50.841 121.553 50.4883 121.782 50.0479 121.972C49.6076 122.161 49.0702 122.256 48.4357 122.256ZM48.6914 120.75C49.3543 120.75 49.913 120.62 50.3675 120.359C50.8268 120.099 51.1725 119.763 51.4045 119.351C51.6412 118.939 51.7596 118.506 51.7596 118.051V116.517C51.6886 116.602 51.5323 116.68 51.2908 116.751C51.0541 116.818 50.7795 116.877 50.467 116.929C50.1592 116.976 49.8585 117.019 49.565 117.057C49.2762 117.09 49.0418 117.118 48.8619 117.142C48.4263 117.199 48.0191 117.291 47.6403 117.419C47.2662 117.542 46.9632 117.729 46.7312 117.98C46.5039 118.226 46.3903 118.562 46.3903 118.989C46.3903 119.571 46.6057 120.011 47.0366 120.31C47.4722 120.603 48.0238 120.75 48.6914 120.75ZM60.6143 122.227C59.7053 122.227 58.9027 121.998 58.2067 121.538C57.5107 121.074 56.9661 120.421 56.5732 119.578C56.1802 118.731 55.9837 117.729 55.9837 116.574C55.9837 115.428 56.1802 114.434 56.5732 113.591C56.9661 112.748 57.513 112.097 58.2138 111.638C58.9145 111.179 59.7242 110.949 60.6428 110.949C61.353 110.949 61.9141 111.067 62.326 111.304C62.7427 111.536 63.0599 111.801 63.2777 112.099C63.5002 112.393 63.6731 112.634 63.7962 112.824H63.9382V107.455H65.6143V122H63.995V120.324H63.7962C63.6731 120.523 63.4979 120.774 63.2706 121.077C63.0433 121.375 62.719 121.643 62.2976 121.879C61.8762 122.111 61.3151 122.227 60.6143 122.227ZM60.8416 120.722C61.514 120.722 62.0821 120.546 62.5462 120.196C63.0102 119.841 63.3629 119.351 63.6044 118.726C63.8459 118.096 63.9666 117.369 63.9666 116.545C63.9666 115.731 63.8482 115.018 63.6115 114.408C63.3748 113.792 63.0244 113.314 62.5604 112.973C62.0964 112.627 61.5234 112.455 60.8416 112.455C60.1314 112.455 59.5395 112.637 59.0661 113.001C58.5973 113.361 58.2446 113.851 58.0078 114.472C57.7758 115.087 57.6598 115.778 57.6598 116.545C57.6598 117.322 57.7782 118.027 58.0149 118.662C58.2564 119.292 58.6115 119.794 59.0803 120.168C59.5537 120.537 60.1409 120.722 60.8416 120.722ZM76.5305 107.455V122H74.7692V107.455H76.5305ZM79.8349 122V111.091H81.4542V112.795H81.5962C81.8235 112.213 82.1905 111.761 82.6971 111.439C83.2037 111.112 83.8121 110.949 84.5224 110.949C85.2421 110.949 85.841 111.112 86.3192 111.439C86.8022 111.761 87.1786 112.213 87.4485 112.795H87.5621C87.8415 112.232 88.2605 111.785 88.8192 111.453C89.378 111.117 90.0479 110.949 90.8292 110.949C91.8046 110.949 92.6024 111.254 93.2227 111.865C93.8429 112.471 94.1531 113.416 94.1531 114.699V122H92.4769V114.699C92.4769 113.894 92.2567 113.319 91.8164 112.973C91.3761 112.627 90.8576 112.455 90.261 112.455C89.494 112.455 88.8997 112.687 88.4783 113.151C88.0569 113.61 87.8462 114.192 87.8462 114.898V122H86.1417V114.528C86.1417 113.908 85.9405 113.409 85.538 113.03C85.1355 112.646 84.6171 112.455 83.9826 112.455C83.547 112.455 83.1398 112.571 82.761 112.803C82.387 113.035 82.0839 113.357 81.8519 113.768C81.6246 114.176 81.511 114.647 81.511 115.182V122H79.8349ZM100.428 122.256C99.7366 122.256 99.1093 122.125 98.5458 121.865C97.9824 121.6 97.5349 121.219 97.2035 120.722C96.872 120.22 96.7063 119.614 96.7063 118.903C96.7063 118.278 96.8294 117.772 97.0756 117.384C97.3219 116.991 97.6509 116.683 98.0629 116.46C98.4748 116.238 98.9293 116.072 99.4265 115.963C99.9284 115.849 100.433 115.759 100.939 115.693C101.602 115.608 102.14 115.544 102.551 115.501C102.968 115.454 103.271 115.376 103.461 115.267C103.655 115.158 103.752 114.969 103.752 114.699V114.642C103.752 113.941 103.56 113.397 103.176 113.009C102.798 112.62 102.222 112.426 101.451 112.426C100.65 112.426 100.023 112.601 99.5685 112.952C99.114 113.302 98.7944 113.676 98.6097 114.074L97.0188 113.506C97.3029 112.843 97.6817 112.327 98.1552 111.957C98.6334 111.583 99.1542 111.323 99.7177 111.176C100.286 111.025 100.845 110.949 101.394 110.949C101.744 110.949 102.147 110.991 102.601 111.077C103.06 111.157 103.503 111.325 103.929 111.581C104.36 111.837 104.718 112.223 105.002 112.739C105.286 113.255 105.428 113.946 105.428 114.812V122H103.752V120.523H103.667C103.553 120.759 103.364 121.013 103.098 121.283C102.833 121.553 102.48 121.782 102.04 121.972C101.6 122.161 101.062 122.256 100.428 122.256ZM100.684 120.75C101.346 120.75 101.905 120.62 102.36 120.359C102.819 120.099 103.165 119.763 103.397 119.351C103.633 118.939 103.752 118.506 103.752 118.051V116.517C103.681 116.602 103.525 116.68 103.283 116.751C103.046 116.818 102.772 116.877 102.459 116.929C102.151 116.976 101.851 117.019 101.557 117.057C101.268 117.09 101.034 117.118 100.854 117.142C100.418 117.199 100.011 117.291 99.6325 117.419C99.2584 117.542 98.9554 117.729 98.7234 117.98C98.4961 118.226 98.3825 118.562 98.3825 118.989C98.3825 119.571 98.5979 120.011 99.0288 120.31C99.4644 120.603 100.016 120.75 100.684 120.75ZM112.891 126.318C112.081 126.318 111.385 126.214 110.803 126.006C110.22 125.802 109.735 125.532 109.347 125.196C108.963 124.865 108.658 124.509 108.43 124.131L109.766 123.193C109.917 123.392 110.109 123.619 110.341 123.875C110.573 124.135 110.89 124.36 111.293 124.55C111.7 124.744 112.232 124.841 112.891 124.841C113.771 124.841 114.498 124.628 115.071 124.202C115.644 123.776 115.93 123.108 115.93 122.199V119.983H115.788C115.665 120.182 115.49 120.428 115.263 120.722C115.04 121.01 114.718 121.268 114.297 121.496C113.88 121.718 113.317 121.83 112.607 121.83C111.726 121.83 110.935 121.621 110.234 121.205C109.538 120.788 108.987 120.182 108.58 119.386C108.177 118.591 107.976 117.625 107.976 116.489C107.976 115.371 108.172 114.398 108.565 113.57C108.958 112.736 109.505 112.092 110.206 111.638C110.907 111.179 111.716 110.949 112.635 110.949C113.345 110.949 113.909 111.067 114.325 111.304C114.747 111.536 115.069 111.801 115.291 112.099C115.518 112.393 115.694 112.634 115.817 112.824H115.987V111.091H117.607V122.312C117.607 123.25 117.393 124.012 116.967 124.599C116.546 125.191 115.978 125.625 115.263 125.899C114.553 126.179 113.762 126.318 112.891 126.318ZM112.834 120.324C113.506 120.324 114.074 120.17 114.538 119.862C115.002 119.554 115.355 119.112 115.597 118.534C115.838 117.956 115.959 117.265 115.959 116.46C115.959 115.674 115.84 114.981 115.604 114.379C115.367 113.778 115.017 113.307 114.553 112.966C114.089 112.625 113.516 112.455 112.834 112.455C112.124 112.455 111.532 112.634 111.058 112.994C110.589 113.354 110.237 113.837 110 114.443C109.768 115.049 109.652 115.722 109.652 116.46C109.652 117.218 109.77 117.888 110.007 118.47C110.249 119.048 110.604 119.502 111.072 119.834C111.546 120.161 112.133 120.324 112.834 120.324ZM125.249 122.227C124.197 122.227 123.291 121.995 122.528 121.531C121.771 121.062 121.186 120.409 120.774 119.571C120.367 118.728 120.163 117.748 120.163 116.631C120.163 115.513 120.367 114.528 120.774 113.676C121.186 112.819 121.759 112.152 122.493 111.673C123.232 111.19 124.093 110.949 125.078 110.949C125.646 110.949 126.207 111.044 126.761 111.233C127.315 111.422 127.82 111.73 128.274 112.156C128.729 112.578 129.091 113.136 129.361 113.832C129.631 114.528 129.766 115.385 129.766 116.403V117.114H121.357V115.665H128.061C128.061 115.049 127.938 114.5 127.692 114.017C127.45 113.534 127.105 113.153 126.655 112.874C126.21 112.594 125.684 112.455 125.078 112.455C124.411 112.455 123.833 112.62 123.345 112.952C122.862 113.278 122.491 113.705 122.23 114.23C121.97 114.756 121.839 115.319 121.839 115.92V116.886C121.839 117.71 121.982 118.409 122.266 118.982C122.554 119.55 122.955 119.983 123.466 120.281C123.977 120.575 124.571 120.722 125.249 120.722C125.689 120.722 126.087 120.66 126.442 120.537C126.802 120.409 127.112 120.22 127.372 119.969C127.633 119.713 127.834 119.396 127.976 119.017L129.595 119.472C129.425 120.021 129.138 120.504 128.736 120.92C128.333 121.332 127.836 121.654 127.244 121.886C126.652 122.114 125.987 122.227 125.249 122.227ZM140.043 113.534L138.537 113.96C138.442 113.709 138.303 113.465 138.118 113.229C137.938 112.987 137.692 112.788 137.379 112.632C137.067 112.476 136.667 112.398 136.179 112.398C135.511 112.398 134.955 112.552 134.51 112.859C134.07 113.162 133.849 113.548 133.849 114.017C133.849 114.434 134.001 114.763 134.304 115.004C134.607 115.246 135.08 115.447 135.724 115.608L137.344 116.006C138.319 116.242 139.046 116.605 139.524 117.092C140.002 117.575 140.241 118.198 140.241 118.96C140.241 119.585 140.062 120.144 139.702 120.636C139.347 121.129 138.849 121.517 138.21 121.801C137.571 122.085 136.828 122.227 135.98 122.227C134.867 122.227 133.946 121.986 133.217 121.503C132.488 121.02 132.027 120.314 131.832 119.386L133.423 118.989C133.575 119.576 133.861 120.016 134.283 120.31C134.709 120.603 135.265 120.75 135.952 120.75C136.733 120.75 137.353 120.584 137.812 120.253C138.277 119.917 138.509 119.514 138.509 119.045C138.509 118.667 138.376 118.349 138.111 118.094C137.846 117.833 137.438 117.639 136.889 117.511L135.071 117.085C134.072 116.848 133.338 116.482 132.869 115.984C132.405 115.482 132.173 114.855 132.173 114.102C132.173 113.487 132.346 112.942 132.692 112.469C133.042 111.995 133.518 111.624 134.119 111.354C134.725 111.084 135.412 110.949 136.179 110.949C137.259 110.949 138.106 111.186 138.722 111.659C139.342 112.133 139.782 112.758 140.043 113.534Z"
                      fill="#3D3C3C"
                    />
                    <circle cx="71" cy="42" r="42" fill="#3B5998" />
                    <path
                      d="M90 48.0002V56.0004C90 57.0612 89.5552 58.0787 88.7633 58.8288C87.9715 59.579 86.8976 60.0004 85.7778 60.0004H56.2222C55.1024 60.0004 54.0285 59.579 53.2367 58.8288C52.4448 58.0787 52 57.0612 52 56.0004V48.0002"
                      stroke="white"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M81.5554 34L70.9999 24L60.4443 34"
                      stroke="white"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M71 24V48.0001"
                      stroke="white"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                  <input
                    type="file"
                    multiple
                    style={{
                      position: "relative",
                      textAlign: "center",
                      width: "100%",
                      display: "none",
                    }}
                    accept="images/png,image/jpg,image/jpeg"
                    id="choose-file"
                    onChange={previewUploadedImagesHandler}
                  />
                  <h7 id="allowedFormats">JPEG, PNG and JPG are allowed</h7>
                </div>
                <p id="no-of-files">No files chosen</p>
                <div
                  className="uploadedImages"
                  style={{
                    width: "90%",
                    border: "2px solid black",
                    positon: "relative",
                    margin: "auto",
                  }}
                ></div>
              </div>
            </div>
          </div>
          <div className="col-md-5 mt-5">
            <div
              className="dose-zoom mt-2 d-flex justify-content-center"
              id="howToQuoteCard"
            >
              <img src={wardrobeImage} id="wardrobeImage" />
              <p className="my-1 stick-bott" id="proTipSecondStep">
                Pro Tip : Upload high resolution photos to create good
                impression among homeowners!
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UploadWardrobePhotos;

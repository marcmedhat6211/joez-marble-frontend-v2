//chars limit
const CHARS_LIMIT = 18;

// shapes block vars
const shapesBlock = $("#shapes_block");

// icons block vars
const iconsBlock = $("#icons_block");

// zodiac block vars
const zodiacSignsBlock = $("#zodiac_block");

//text block vars
const textBlock = $("#text_block");
const textInput = textBlock.find("input[name=shape-text]");
const charsLimitText = textBlock.find("#shape_chars_limit");

// shape figure path
const shapeFigurePath = "images/gifts/shapes";

let canAddToShape = true;

$(document).ready(function () {
  // set chars limit
  setCharsLimitHandler();

  textInput.on("keyup", function () {
    let length = $(this).val().length;
    length = CHARS_LIMIT - length;
    charsLimitText.text(length);
  });

  //================================================ WHEN CHANGING MAIN SHAPES ==============================================
  $("body").on("click", ".page-block .shapes-block .shape", function () {
    const svgName = $(this).data("svg-name");
    $("#shape #shape_figure").remove();
    drawMainShape(svgName, $("#shape .shape-figure__container"));
    convertSvgToIcon($("i#shape_figure"));
    $(".form-check.shape").removeClass("checked");
    $(this).addClass("checked");
  });
  //================================================ END WHEN CHANGING MAIN SHAPES ==============================================

  //================================================ WHEN WRITING TEXT ON SHAPE ==============================================
  $("body").on("input", ".page-block .text-block #shape_text", function () {
    $("#shape .shape-text.shape__content").text($(this).val());
  });
  //================================================ END WHEN WRITING TEXT ON SHAPE ==============================================

  //================================================ COLOR PICKER ==============================================
  $("#color_picker").spectrum();
  $("#color_picker").on("move.spectrum", function (e, tinycolor) {
    const HexColor = tinycolor.toHexString();
    $("#shape .shape-text.shape__content").css({
      color: HexColor,
    });
  });
  //================================================ END COLOR PICKER ==============================================

  //================================================ CHANGE THE POSITION OF THE SHAPE CONTENT USING ARROWS ==============================================
  $("body").on("mousedown", "#shape .page-btn.move-btn", function () {
    const shapeContent = $("#shape .shape__content.shape-text");
    if ($(this).hasClass("up")) {
      shapeContent.css({
        top: `${convertCssPropertyInPxToInt(shapeContent.css("top")) - 5}px`,
      });
    } else if ($(this).hasClass("right")) {
      shapeContent.css({
        left: `${convertCssPropertyInPxToInt(shapeContent.css("left")) + 5}px`,
      });
    } else if ($(this).hasClass("down")) {
      shapeContent.css({
        top: `${convertCssPropertyInPxToInt(shapeContent.css("top")) + 5}px`,
      });
    } else if ($(this).hasClass("left")) {
      shapeContent.css({
        left: `${convertCssPropertyInPxToInt(shapeContent.css("left")) - 5}px`,
      });
    }
  });
  //================================================ END CHANGE THE POSITION OF THE SHAPE CONTENT USING ARROWS ==============================================

  //================================================ ADD ICONS TO SHAPE ==============================================
  $("body").on(
    "click",
    "#icons_block .icon, #numbers_block .icon",
    function () {
      const icon = $(this);
      const path = icon.attr("id");
      const clicked = $(this);
      console.log(clicked);
      $("#shape .shape__content.shape-icon").empty();
      drawIcon(
        path,
        $("#shape .shape__content.shape-icon"),
        clicked.hasClass("icon-type") ? "icon" : "number"
      );
      convertSvgToIcon($("#shape .shape__content.shape-icon i"));
    }
  );
  //================================================ END ADD ICONS TO SHAPE ==============================================

  //================================================ FILL ICONS IN SHAPE ==============================================
  $("body").on("change", "#fill_shape", function () {
    if ($(this).is(":checked")) {
      $("#shape .shape__content.shape-icon")
        .removeClass("number-type")
        .addClass("icon-filled");
    } else {
      $("#shape .shape__content.shape-icon").removeClass("icon-filled");
    }
  });

  $("body").on("change", "#fill_shape_numbers", function () {
    if ($(this).is(":checked")) {
      $("#shape .shape__content.shape-icon")
        .removeClass("icon-type")
        .addClass("number-filled");
    } else {
      $("#shape .shape__content.shape-icon").removeClass("number-filled");
    }
  });
  //================================================ END FILL ICONS IN SHAPE ==============================================

  //================================================ MARBLES SLIDER ==============================================
  const marblesSwiper = new Swiper(".swiper-container#marbles_slider", {
    loop: true,
    slidesPerView: 5,
    spaceBetween: 20,
    lazy: {
      preloadImages: false,
      loadPrevNext: true,
      loadPrevNextAmount: 4,
    },
    navigation: {
      nextEl: ".swiper-btn-next-marbles",
      prevEl: ".swiper-btn-prev-marbles",
    },
    // breakpoints: {
    //   991.98: {
    //     slidesPerView: 2,
    //     spaceBetween: 20,
    //     watchSlidesVisibility: true,
    //   },
    // },
  });
  //================================================ END MARBLES SLIDER ==============================================

  //================================================ HANDLE MARBLES CLICKS ==============================================
  $("body").on("click", "#marbles_slider .marble-container", function () {
    $("#marbles_slider .marble-container").not($(this)).removeClass("active");
    $(this).addClass("active");
    const imgPath = $(this).data("src");
    const shapeFigureContainer = $(".shape-figure__container");
    shapeFigureContainer.find(".shape__content.shape__marble-image").remove();
    drawMarbleBg(imgPath, shapeFigureContainer);
  });
  //================================================ END HANDLE MARBLES CLICKS ==============================================

  //================================================ HANDLE THE PICTURE SCREENSHOT AND SEND IT TO BACKEND ==============================================
  $("body").on("click", "#submit_gift_btn", function () {
    takeshot();
  });
  //================================================ END HANDLE THE PICTURE SCREENSHOT AND SEND IT TO BACKEND ==============================================
});

const setCharsLimitHandler = () => {
  textInput.attr("maxlength", CHARS_LIMIT);
  charsLimitText.text(CHARS_LIMIT);
};

const drawMainShape = (svgName, containerElement) => {
  const mainShape = $("<i>").attr({
    id: "shape_figure",
    class: "convert-svg",
    "data-src": `../../${shapeFigurePath}/${svgName}`,
  });

  mainShape.appendTo(containerElement);
};

const convertCssPropertyInPxToInt = (cssProperty) => {
  return parseInt(cssProperty.replace("px", ""));
};

const drawIcon = (iconPath, destinationContainer, iconType) => {
  const icon = $("<i>").attr({
    class: `convert-svg ${iconType === "icon" ? "icon-type" : "number-type"}`,
    "data-src": iconPath,
  });

  icon.appendTo(destinationContainer);
};

const drawMarbleBg = (imagePath, destinationContainer) => {
  const image = $("<img>").attr({
    class: "shape__content shape__marble-image",
    src: imagePath,
    alt: getImageNameFromPath(imagePath),
  });

  image.appendTo(destinationContainer);
};

const getImageNameFromPath = (imagePath) => {
  const imagePathArr = imagePath.split("/");
  const nameForPath = imagePathArr[imagePathArr.length - 1];
  const nameForPathArr = nameForPath.split("-");
  let adjustedNameForPathArr = [];
  for (const namePart of nameForPathArr) {
    adjustedNameForPathArr.push(
      namePart.charAt(0).toUpperCase() + namePart.slice(1)
    );
  }

  return adjustedNameForPathArr.join(" ");
};

// Define the function
// to screenshot the div
const takeshot = () => {
  let div = $("#shape").get(0);
  // Use the html2canvas
  // function to take a screenshot
  // and append it
  // to the output div
  html2canvas(div).then((canvas) => {
    document.getElementById("output").appendChild(canvas);
  });
};

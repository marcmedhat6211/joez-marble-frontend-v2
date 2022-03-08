var desktopHeader = $("header #desktop_header");
var desktopHeaderPartOne = desktopHeader.find("#header_part_one");
var desktopHeaderPartTwo = desktopHeader.find("#header_part_two");
var desktopHeaderPartThree = desktopHeader.find("#header_part_three");
var productCard = $(".card.card-style-1");
$(document).ready(function () {
  //lazy loading
  if ($("img.lazy").length > 0) {
    $("img.lazy").lazy({
      effect: "fadeIn",
    });
  }

  // header part two dropdowns
  desktopHeaderPartTwo.find(".icon-container").each(function () {
    let $this = $(this);
    let iconBtn = $this.find(".icon-btn");
    let iconDropdown = $this.find(".icon-dropdown");
    $this.on({
      mouseenter: function () {
        iconDropdown.addClass("show");
        iconBtn.addClass("active");
      },
      mouseleave: function () {
        setTimeout(() => {
          if ($this.find(".icon-dropdown:hover").length == 0) {
            iconDropdown.removeClass("show");
            iconBtn.removeClass("active");
          }
        }, 100);
      },
    });
  });

  // header part three dropdowns
  desktopHeaderPartThree.find(".header-three-item").each(function () {
    let $this = $(this);
    let itemDropdown = $this.find(".header-three-dropdown");
    let itemLinksContainer = itemDropdown.find(".dropdown-links-container");
    $this.on({
      mouseenter: function () {
        itemDropdown.addClass("show");
        $this.addClass("active");
        itemLinksContainer.addClass("animate");
      },
      mouseleave: function () {
        setTimeout(() => {
          if ($this.find(".header-three-dropdown:hover").length == 0) {
            itemDropdown.removeClass("show");
            $this.removeClass("active");
            itemLinksContainer.removeClass("animate");
          }
        }, 100);
      },
    });
  });

  // back to top btn
  $("#back_to_top_btn").on("click", function () {
    $("html, body").animate({ scrollTop: 0 }, 1000);
  });

  //search bar active state
  desktopHeaderPartTwo
    .find("#desktop_search_form .input-container input")
    .on("focus", function () {
      $(this).closest(".input-container").addClass("active");
    });
  $(document).on("click", function (e) {
    var searchBarInputContainer = desktopHeaderPartTwo.find(
      "#desktop_search_form .input-container"
    );
    var searchBarInput = searchBarInputContainer.find("input");
    if (
      searchBarInput.val() == "" &&
      !(
        $(e.target).is("#desktop_search_form .input-container") ||
        $(e.target).is("#desktop_search_form .input-container *")
      )
    ) {
      searchBarInputContainer.removeClass("active");
    }
  });

  // fav icon on product card
  if (productCard.length > 0) {
    if (productCard.length > 1) {
      productCard.each(function () {
        $(this)
          .find(".fav-btn")
          .on("click", function (e) {
            e.preventDefault();
            $(this).toggleClass("active");
          });
      });
    } else {
      productCard.find(".fav-btn").on("click", function (e) {
        e.preventDefault();
        $(this).toggleClass("active");
      });
    }
  }

  // svg icons
  $("i.convert-svg").each(function () {
    var $img = $(this);
    convertSvgToIcon($img);
  });
});

function convertSvgToIcon($img) {
  var imgID = $img.attr("id");
  var imgClass = $img.attr("class");
  var imgURL = $img.attr("data-src");
  if (typeof imgURL === "undefined") {
    return false;
  }

  $svg = getSvgIconByUrl(imgURL);
  if ($svg == null) {
    return false;
  }

  // Add replaced image's ID to the new SVG
  if (typeof imgID !== "undefined") {
    $svg = $svg.attr("id", imgID);
  }
  // Add replaced image's classes to the new SVG
  if (typeof imgClass !== "undefined") {
    $svg = $svg.attr("class", imgClass + " replaced-svg");
  }
  $img.replaceWith($svg);
}

function getSvgIconByUrl(imgURL) {
  var $svg = null;

  $.ajax({
    url: imgURL,
    type: "get",
    dataType: "xml",
    async: false,
    success: function (data) {
      $svg = $(data).find("svg");

      // Remove any invalid XML tags as per http://validator.w3.org
      $svg = $svg.removeAttr("xmlns:a");

      // Check if the viewport is set, if the viewport is not set the SVG wont't scale.
      if (!$svg.attr("viewBox") && $svg.attr("height") && $svg.attr("width")) {
        $svg.attr(
          "viewBox",
          "0 0 " + $svg.attr("height") + " " + $svg.attr("width")
        );
      }
    },
  });

  return $svg;
}

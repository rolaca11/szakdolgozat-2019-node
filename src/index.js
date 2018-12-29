import $ from 'jquery';
window.jQuery = $;
window.$ = $;

import 'bootstrap';
import '@fortawesome/fontawesome-free/js/all.min'
import './index.scss';

$(document).ready(function () {
    $("#menuPanel").on("float.out", function (e) {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();

        $("#cover").fadeOut(400);
    }).on("float.in", function (e) {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();

        $("#cover").fadeIn(400);
    });

    $("*[data-toggle=\"float\"]").on("click", function () {
        setState($(this));
    }).each(function () {
        setState($(this), "init");
    });
});

function setState(button, state) {
    let targetState = button.attr("aria-expanded") === 'true';
    const target = $(button.attr("data-target"));

    if(state === undefined) {
        state = "toggle";
    }

    if(state === "toggle") {
        targetState = !targetState;
    }

    if(state === "in") {
        targetState = true;
    }

    if(state === "out") {
        targetState = false;
    }

    if(targetState) {
        floatIn(button, target);
        target.trigger("float.in");
    } else {
        floatOut(button, target);
        target.trigger("float.out");
    }
}

function floatIn(button, target) {
    target.removeClass("out");
    target.addClass("in");

    button.attr("aria-expanded", "true");
}

function floatOut(button, target) {
    target.removeClass("in");
    target.addClass("out");

    button.attr("aria-expanded", "false");
}
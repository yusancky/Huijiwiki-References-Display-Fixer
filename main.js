/**
 * Huijiwiki-References-Display-Fixer - A MediaWiki gadget that fixes display issues in Huijiwiki's reference system
 * Copyright (C) 2025 yusancky
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

(function (mw) {
  "use strict";
  function fixRefDisplay(headline) {
    console.log(
      '[Huijiwiki-References-Display-Fixer] Start fixing headline "' +
        headline +
        '"'
    );
    if (document.readyState !== "loading") {
      processRefDisplay(headline);
    } else {
      document.addEventListener("DOMContentLoaded", function () {
        processRefDisplay(headline);
      });
    }
  }
  function showSuccess() {
    var note = document.createElement("div");
    note.id = "ref-fix-notification";
    note.className = "ref-fix-notification";
    var iframe = document.createElement("iframe");
    iframe.src = "notification.html";
    iframe.className = "ref-fix-notification-iframe";
    note.appendChild(iframe);
    var body =
      document.querySelector("#wiki-body.container.wiki-body") || document.body;
    body.appendChild(note);
    iframe.onload = function () {
      var tries = 0;
      var max = 10;
      var interval = 200;
      function check() {
        tries++;
        try {
          var ready =
            iframe.contentWindow &&
            iframe.contentWindow.document.readyState === "complete" &&
            (iframe.contentWindow._internalReady !== undefined || tries >= max);
          if (ready) {
            enterAnim();
          } else {
            setTimeout(check, interval);
          }
        } catch (e) {
          if (tries >= max) {
            enterAnim();
          } else {
            setTimeout(check, interval);
          }
        }
      }
      setTimeout(check, interval);
    };
    function enterAnim() {
      note.style.opacity = "1";
      note.style.right = "10px";
      setTimeout(function () {
        note.style.right = "-160px";
        note.style.opacity = "0";
        setTimeout(function () {
          note.remove();
        }, 500);
      }, 1000);
    }
  }
  function processRefDisplay(headline) {
    var heads = document.querySelectorAll(".mw-headline");
    var count = 0;
    heads.forEach(function (hd) {
      if (hd.textContent.trim() === headline) {
        var h2 = hd.closest("h2");
        if (!h2) return;
        var res = findRefContainer(h2);
        if (!res) return;
        var refs = res.refs;
        var cont = res.cont;
        var clone = cont.cloneNode(true);
        var newH2 = document.createElement("h2");
        newH2.innerHTML =
          '<span id="' +
          (hd.id || "") +
          '">' +
          '<span class="mw-headline">' +
          hd.textContent +
          "</span></span>";
        var newDiv = document.createElement("div");
        newDiv.className = "mw-references-wrap";
        newDiv.appendChild(
          cont === refs
            ? clone
            : clone.querySelector("ol.references, ol.mw-references")
        );
        var parent = cont.parentNode;
        parent.insertBefore(newDiv, cont.nextSibling);
        parent.insertBefore(newH2, newDiv);
        parent.removeChild(cont);
        if (h2.parentNode) parent.removeChild(h2);
        count++;
        showSuccess();
      }
    });
  }
  function findRefContainer(h2) {
    var node = h2.nextElementSibling;
    while (node) {
      if (
        node.tagName === "OL" &&
        (node.classList.contains("references") ||
          node.classList.contains("mw-references"))
      ) {
        return {
          refs: node,
          cont: node,
        };
      } else if (node.tagName === "DIV") {
        var ol = node.querySelector("ol.references, ol.mw-references");
        if (ol)
          return {
            refs: ol,
            cont: node,
          };
      }
      node = node.nextElementSibling;
    }
    return null;
  }
  window.fixRefDisplay = fixRefDisplay;
  fixRefDisplay("References");
  fixRefDisplay("参考资料");
})(mediaWiki);

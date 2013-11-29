(function() {
    var root,
        element;

    function triggerEvent(type, e, el) {
        el = el || element;
        el.trigger($.Event(type, e));
    }

    module("Swipe", {
        setup: function() {
            this.testTimeout = QUnit.config.testTimeout;
            QUnit.config.testTimeout = 1500;
            root = $('#qunit-fixture');
            root.html('<div id="foo">Foo</div>').wrapInner("<div />");
            element = root.children().first();
        },
        teardown: function() {
            QUnit.config.testTimeout = this.testTimeout;
        }
    });

    test("triggers swipe event", 1, function() {
        element.kendoMobileSwipe(function(e) {
            ok(true);
        });

        triggerEvent("mousedown", {pageX: 1, pageY: 1});
        triggerEvent("mousemove", {pageX: 20, pageY: 1});
        triggerEvent("mousemove", {pageX: 40, pageY: 1});
        triggerEvent("mouseup", {pageX: 40, pageY: 1});
    });

    test("ignores shorter swipes", 0, function(){
        element.kendoMobileSwipe(function(e) {
            ok();
        });

        triggerEvent("mousedown", {pageX: 1, pageY: 1});
        triggerEvent("mousemove", {pageX: 10, pageY: 1});
        triggerEvent("mouseup", {pageX: 10, pageY: 1});
    });

    test("ignores vertical swipes", 0, function() {
        element.kendoMobileSwipe(function(e) {
            ok();
        });

        triggerEvent("mousedown", {pageX: 1, pageY: 1});
        triggerEvent("mousemove", {pageX: 40, pageY: 40});
        triggerEvent("mouseup", {pageX: 40, pageY: 40});
    });

    asyncTest("ignores slow swipe event", 0, function() {
        element.kendoMobileSwipe(function(e) {
            ok();
        });

        triggerEvent("mousedown", {pageX: 1, pageY: 1});
        triggerEvent("mousemove", {pageX: 2, pageY: 2});
        setTimeout(function() {
            triggerEvent("mousemove", {pageX: 40, pageY: 1});
            triggerEvent("mouseup", {pageX: 40, pageY: 1});
            start();
        }, 1100);
    });

    test("detects right swipe", 1, function() {
        element.kendoMobileSwipe(function(e) {
            equal(e.direction, "right");
        });

        triggerEvent("mousedown", {pageX: 1, pageY: 1});
        triggerEvent("mousemove", {pageX: 40, pageY: 1});
        triggerEvent("mouseup", {pageX: 40, pageY: 1});
    });

    test("detects left swipe", 1, function() {
        element.kendoMobileSwipe(function(e) {
            equal(e.direction, "left");
        });

        triggerEvent("mousedown", {pageX: 40, pageY: 1});
        triggerEvent("mousemove", {pageX: 1, pageY: 1});
        triggerEvent("mouseup", {pageX: 1, pageY: 1});
    });

    test("passes the swiped element", 1, function() {
        element.kendoMobileSwipe(function(e) {
            equal(e.target[0], element[0]);
        });

        triggerEvent("mousedown", {pageX: 40, pageY: 1});
        triggerEvent("mousemove", {pageX: 1, pageY: 1});
        triggerEvent("mouseup", {pageX: 1, pageY: 1});
    });
})();

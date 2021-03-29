var StackNode = /** @class */ (function () {
    function StackNode(next, value) {
        this.next = next;
        this.value = value;
    }
    return StackNode;
}());
var MaxSizeReachedException = /** @class */ (function () {
    function MaxSizeReachedException() {
    }
    return MaxSizeReachedException;
}());
var StackIsEmptyException = /** @class */ (function () {
    function StackIsEmptyException() {
    }
    return StackIsEmptyException;
}());
var Stack = /** @class */ (function () {
    function Stack() {
        this.count = 0;
    }
    Stack.prototype.push = function (val) {
        var node = new StackNode(this.currentNode, val);
        this.currentNode = node;
        this.count++;
    };
    Stack.prototype.clear = function () {
        this.count = 0;
        this.currentNode = undefined;
    };
    Stack.prototype.pop = function () {
        if (!this.count)
            throw new StackIsEmptyException();
        var cN = this.currentNode;
        this.currentNode = cN.next;
        this.count--;
        return cN.value;
    };
    Stack.prototype.peak = function () {
        if (this.currentNode == undefined)
            throw new StackIsEmptyException();
        return this.currentNode.value;
    };
    Stack.prototype.getIsEmpty = function () {
        return !this.count;
    };
    return Stack;
}());
var opens = ["[", "(", "{"];
var closes = ["]", ")", "}"];
var s = new Stack();
function checkIsStringValid(str) {
    s.clear();
    for (var _i = 0, str_1 = str; _i < str_1.length; _i++) {
        var c = str_1[_i];
        var i = opens.indexOf(c);
        if (i != -1) {
            s.push(i);
            continue;
        }
        var eI = closes.indexOf(c);
        if (eI != -1) {
            if (s.getIsEmpty())
                return false;
            var inStack = s.pop();
            if (inStack == eI) {
            }
            else {
                return false;
            }
        }
    }
    return s.getIsEmpty();
}
for (var _i = 0, _a = ["((sss)", "())", ")ee", "(", "({)}", "[{{}}()]"]; _i < _a.length; _i++) {
    var s_1 = _a[_i];
    console.log("For '" + s_1 + "' got " + checkIsStringValid(s_1));
}

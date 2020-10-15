// Creates a node containing the data and a reference to the next item
class _Node {
    constructor(data, next) {
        this.data = data;
        this.next = next;
    }
}

class Stack {
    constructor() {
        this.top = null;
    }

    push(data) {
        /* 
            If the stack is empty, then the node will be the
            top of the stack 
        */
        if (this.top === null) {
            this.top = new _Node(data, null);
            return this.top;
        }

        /* 
            If the stack already has something, 
            then create a new node,
            add data to the new node, and
            have the pointer point to the top 
        */
        const node = new _Node(data, this.top);
        this.top = node;
    }

    pop() {
        /* 
            In order to remove the top of the stack, you have to point
            the pointer to the next item and that next item becomes the
            top of the stack 
        */
        const node = this.top;
        this.top = node.next;
        return node.data;
    }

    peek() {
        return this.top.data;
    }

    isEmpty() {
        if (this.top === null) {
            return true;
        }
        return false;
    }

    display() {
        let stack = '';
        let curr = this.top;

        while (curr !== null) {
            stack = stack + ' ' + curr.data;
            curr = curr.next;
        }
        console.log(stack);
    }
}

function is_palindrome(s) {
    s = s.toLowerCase().replace(/[^a-zA-Z0-9]/g, "");
    const stack = new Stack();
    let i = 0;
    while (i < s.length) {
        stack.push(s[i]);
        i++;
    }

    let j = 0;
    while (j < s.length) {
        if (s[j] !== stack.pop()) {
            return false;
        }
        j++;
    }
    return true;
}

function missingParens(expression) {
    const stack = new Stack();

    let i = expression.length - 1;

    while (i >= 0) {
        stack.push(expression[i])
        i--;
    }

    let j = 0;
    let open = false;
    let openPosition;
    let closed = false;
    let closedPosition;
    
    while (j < expression.length) {
        const char = stack.pop()
        if (char === '(') {
            open = true;
            openPosition = j;
        }

        if (char === ')') {
            closed = true;
            closedPosition = j;
        }
        j++;
    }

    if (open !== closed) {
        if (open === false) {
            return `You are missing a '('; closed position at ${closedPosition}`;
        }
        if (closed === false) {
            return `You are missing a ')'; open position at ${openPosition}`;
        }
    } else {
        return 'No error';
    }
}

function extendedParens(expression) {
    const openStack = new Stack();
    let i = 0;
    while (i < expression.length) {
        const char = expression[i]
        if (char === '(' || char === '[' || char === '{') {
            openStack.push(char);
            i++;
        }
        if (char === ')') {
            if (openStack.isEmpty()) {
                return `Found ${char} at position ${i} with no corresponding open`;
            }
            const open = openStack.pop();
            if (open !== '(') {
                const expected = open === '[' ? ']' : '}';
                return `Found '${char}' at position ${i}; expected '${expected}'`;
            }
        }
        if (char === ']') {
            if (openStack.isEmpty()) {
                return `Found ${char} at position ${i} with no corresponding open`;
            }
            const open = openStack.pop();
            if (open !== '[') {
                const expected = open === '{' ? '}' : ')';
                return `Found '${char}' at position ${i}; expected '${expected}'`;
            }
        }
        if (char === '}') {
            if (openStack.isEmpty()) {
                return `Found ${char} at position ${i} with no corresponding open`;
            }
            const open = openStack.pop();
            if (open !== '{') {
                const expected = open === '[' ? ']' : ')';
                return `Found '${char}' at position ${i}; expected '${expected}'`;
            }
        }
        i++;
    }
    return 'No errors found';
}

function extendedExtendedParens(expression) {
    const openStack = new Stack();
    const quoteStack = new Stack();    
    
    let i = 0;
    let ignore = false;
    while (i < expression.length) {
        const char = expression[i];
        if (char === `"` || char === `'`) {
            if (quoteStack.isEmpty()) {
                ignore = true;
                quoteStack.push(char);
                i++
            } else {
                const last = quoteStack.pop();
                if (last === char) {
                    if (quoteStack.isEmpty()) {
                        ignore = false;
                        i++;
                    } else {
                        i++;
                    }
                } else {
                    quoteStack.push(last);
                    quoteStack.push(char);
                }
            }
        } else if (ignore) {
            i++;
        } else {
            if (char === '(' || char === '[' || char === '{') {
                openStack.push(char);
                i++;
            }
            if (char === ')') {
                if (openStack.isEmpty()) {
                    return `Found ${char} at position ${i} with no corresponding open`;
                }
                const open = openStack.pop();
                if (open !== '(') {
                    const expected = open === '[' ? ']' : '}';
                    return `Found '${char}' at position ${i}; expected '${expected}'`;
                }
            }
            if (char === ']') {
                if (openStack.isEmpty()) {
                    return `Found ${char} at position ${i} with no corresponding open`;
                }
                const open = openStack.pop();
                if (open !== '[') {
                    const expected = open === '{' ? '}' : ')';
                    return `Found '${char}' at position ${i}; expected '${expected}'`;
                }
            }
            if (char === '}') {
                if (openStack.isEmpty()) {
                    return `Found ${char} at position ${i} with no corresponding open`;
                }
                const open = openStack.pop();
                if (open !== '{') {
                    const expected = open === '[' ? ']' : ')';
                    return `Found '${char}' at position ${i}; expected '${expected}'`;
                }
            }
            i++;    
        }
    }
    return 'No errors found';
}

function sortStack(list) {
    const holder = new Stack();

    let sorted = false;
    let temp;

    while (!sorted) {
        let listEmpty = false;
        while (!listEmpty) {
            const num = list.pop();
            if (!temp) {
                temp = num;
            } else {
                if (num > temp) {
                    holder.push(temp);
                    temp = num;
                } else {
                    holder.push(num);
                }
            }
            if (list.isEmpty()) {
                listEmpty = true;
            }
        }

        let holderEmpty = false;
        while (!holderEmpty) {
            const num = holder.pop();
            if (temp > num) {
                list.push(temp);
                temp = num;
            } else {
                list.push(num)
            }
            if (holder.isEmpty()) {
                holderEmpty = true;
            }
        }

        const num = list.pop();
        if (num > temp) {
            list.push(num);
            list.push(temp);
            sorted = true;
        } else {
            list.push(num);
            sorted = false;
        }
    }
}

class QueueViaStack {
    constructor() {
        this.holder = new Stack();
        this.queue = new Stack();
    }

    enqueue(data) {
        if (this.queue.isEmpty()) {
            this.queue.push(data);
        } else {
            let queueEmpty = false;
            while (!queueEmpty) {
                const temp = this.queue.pop();
                this.holder.push(temp);
                if (this.queue.isEmpty()) {
                    queueEmpty = true;
                }
            }
            this.holder.push(data);

            let holderEmpty = false;
            while (!holderEmpty) {
                const temp = this.holder.pop();
                this.queue.push(temp);
                if (this.holder.isEmpty()) {
                    holderEmpty = true;
                }
            }
        }
    }

    dequeue() {
        this.queue.pop();
    }
}

function main() {
    // const starTrek = new Stack();
    // starTrek.push('Kirk');
    // starTrek.push('Spock');
    // starTrek.push('McCoy');
    // starTrek.push('Scotty');
    // starTrek.display();
    // const nums = new Stack();
    // nums.push(4);
    // nums.push(2);
    // nums.push(5);
    // nums.push(7);
    // nums.push(1);
    // nums.display();
    // sortStack(nums);
    // nums.display();

    const starTrek = new QueueViaStack();
    starTrek.enqueue('Kirk');
    starTrek.enqueue('Spock');
    starTrek.enqueue('Uhura');
    starTrek.enqueue('Sulu');
    starTrek.enqueue('Checkov');
    starTrek.queue.display();
}

main();

// console.log(is_palindrome("dad"));
// console.log(is_palindrome("A man, a plan, a canal: Panama"));
// console.log(is_palindrome("1001"));
// console.log(is_palindrome("Tauhida"));

// console.log(missingParens(`(a + b)`))
// console.log(missingParens(`(a + b`))
// console.log(missingParens(`a + b)`))

// console.log(extendedExtendedParens(`(3 + [x - y] + [y - x {3 + 4}])`));
// console.log(extendedExtendedParens(`(3[9+2)-4]`));
// console.log(extendedExtendedParens(`(3 + '[x - y]' + [y - x {3 + 4}])`));
// console.log(extendedExtendedParens(`(3"[9+"2)-4]`));


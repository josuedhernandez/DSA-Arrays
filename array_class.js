"use strict";
const Memory = require("./memory");
const memory = new Memory();

// 1. Implement an Array class from scratch.
class Array {
  constructor() {
    this.length = 0;
    this._capacity = 0;
    this.ptr = memory.allocate(this.length);
  }

  push(value) {
    if (this.length >= this._capacity) {
      this._resize((this.length + 1) * Array.SIZE_RATIO);
    }
    memory.set(this.ptr + this.length, value);
    this.length++;
  }

  _resize(size) {
    const oldPtr = this.ptr;
    this.ptr = memory.allocate(size);
    if (this.ptr === null) {
      throw new Error(`Out of memory`);
    }
    memory.copy(this.ptr, oldPtr, this.length);
    memory.free(oldPtr);
    this._capacity = size;
  }

  get(index) {
    if (index < 0 || index >= this.length) {
      throw new Error(`Index error`);
    }

    return memory.get(this.ptr + index);
  }

  pop() {
    if (this.length == 0) {
      throw new Error(`Index error`);
    }

    const value = memory.get(this.ptr + this.length - 1);
    this.length--;
    return value;
  }

  insert(index, value) {
    if (index < 0 || index >= this.length) {
      throw new Error(`Index error`);
    }

    if (this.length >= this._capacity) {
      this._resize((this.length + 1) * Array.SIZE_RATIO);
    }

    memory.copy(this.ptr + index + 1, this.ptr + index, this.length - index);
    memory.set(this.ptr + index, value);
    this.length++;
  }

  remove(index) {
    if (index < 0 || index >= this.length) {
      throw new Error(`Index error`);
    }
    memory.copy(
      this.ptr + index,
      this.ptr + index + 1,
      this.length - index - 1
    );
    this.length--;
  }
}

Array.SIZE_RATIO = 3;

// 2. Explore the push() method
function main() {
  Array.SIZE_RATIO = 3;

  // Create an instance of the Array class
  let arr = new Array();

  // Add an item to the array
  arr.push(3);
  console.log(arr);
  /* What is the length, capacity and memory address of 
   your array?
   A: Lenght:1, capacity:3, memory address:0
   */

  arr.push(5);
  arr.push(15);
  arr.push(19);
  arr.push(45);
  arr.push(10);
  console.log(arr);
  /* Explore the push() method
  What is the length, capacity and memory
     address of your array?
     A: Lenght:6, capacity:6, memory address:0
     Array increased lenght by the number of elements added
     to the array, the capacity is using the size_ratio value of 
     1:3 so finale size is 12, when the size is 3 there is
     an increase in capacity (3 + 1) * 3 = 12 and the memory address is 3.
   */

  /* Exploring the pop() method
  What is the length, capacity, and address of your array?
  A: Lenght after pop would be 3. Capacity the same as there aren't
  calls to the size function, memory address:3
   */
  arr.pop();
  arr.pop();
  arr.pop();
  console.log(arr);

  // Understanding more about how arrays work
  // Print the 1st item in the array arr.
  console.log(arr.get(0));
  // Empty the array and add just 1 item: arr.push("tauhida");
  var array_length = arr.length;
  while (array_length > 0) {
    arr.remove(0);
    array_length--;
  }
  arr.push("tauhida");

  // Print this 1 item that you just added. What is the result?
  console.log(arr.get(0));
  /* Can you explain your result?
     A: the result is NaN, the reason is because our memory class is an array
   of ints. When the string gets set it check and defines NaN for the elements that
   the array should have.
   */

  // What is the purpose of the _resize() function in your Array class?
  // A: Allocate memory for the array based on the size ratio.
}

main();

console.log("Drills start here");

// URLify a string
function urlify(string) {
  return string.replace(/ /g, "%20");
}
console.log(urlify("tauhida parveen"));
console.log(urlify("www.thinkful.com /tauh ida parv een"));
// Big O is constant. O(1)

// Filtering an array
function filter_elements(array) {
  // Assumes all elements are numbers.
  var array_response = [];
  for (var i = 0; i < array.length; i++) {
    if (array[i] >= 5) {
      array_response.push(array[i]);
    }
  }
  return array_response;
}
console.log(filter_elements([4, 6, -3, 5, -2, 1]));

// Max sum in the array
function max_sum(array) {
  // Assumes all elements are numbers.
  var max_sum = array[0]
  var sum = array[0]; // Largest sum is the first element it will be used to compare
  for (var i = 1; i < array.length; i++) {
    sum = sum + array[i];
    if (sum > max_sum) {
      max_sum = sum;
    }
  }
  return max_sum;
}
console.log(max_sum([4, 6, -3, 5, -2, 1]));

// Merge Arrays from sorted arrays.
function merge_arrays(arr1, arr2) {
  var merged_arr = [];
  var j_start = 0;
  var reached_end = false;
  for (var i = 0; i < arr1.length; i++) {
    for (var j = j_start; j < arr2.length; j++) {
      if (arr1[i] > arr2[j]) {
        merged_arr.push(arr2[j]);
        // Need to improve this to avoid repeating myself.
      } else {
        merged_arr.push(arr1[i]);
        // if last element from i push the rest of arr2
        if (i + 1 >= arr1.length) {
          merged_arr.push(...arr2.slice(j));
        }
        break;
      }
      if (j + 1 >= arr2.length) {
        reached_end = true;
      }
    }
    j_start = j;
    if (reached_end) {
      merged_arr.push(arr1[i]);
    }
  }

  return merged_arr;
}

console.log(merge_arrays([1, 3, 6, 8, 11], [2, 3, 5, 8, 9, 10]));
console.log(merge_arrays([11, 12, 13, 15, 16], [2, 3, 5, 12, 13, 14]));
console.log(merge_arrays([11, 11, 12, 12], [9, 9, 10, 13, 13]));

// Remove characters
function remove_characters(string, characters) {
  var response_string = '';
  for (var i = 0; i < string.length; i++) {
      if(!(characters.indexOf(string[i]) >= 0)) {
          response_string += string[i];
      }
  }

  return response_string;
}

console.log(remove_characters('Battle of the Vowels: Hawaii vs. Grozny', 'ae'));

// Products
function products(array) {
      let productArr = [];
      for (let x of array) {
        let product = 1;
        array.filter((y) => y !== x).forEach((y) => (product *= y));
        productArr.push(product);
      }
      return productArr;
}
console.log(products([1, 2, 3, 4]));

// Reverse String
function reverseString(string) {
    return string.split("").reverse().join("");
}

console.log(reverseString('test 1234'));
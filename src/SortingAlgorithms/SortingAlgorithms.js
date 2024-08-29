export function getMergeSortAnimations(array) {
    const animations = [];
    if (array.length <= 1) return array;
    const auxiliaryArray = array.slice();
    mergeSortHelper(array, 0, array.length - 1, auxiliaryArray, animations);
    return animations;
  }
  
  function mergeSortHelper(mainArray,startIdx,endIdx,auxiliaryArray,animations) {
    if (startIdx === endIdx) return;
    const middleIdx = Math.floor((startIdx + endIdx) / 2);
    mergeSortHelper(auxiliaryArray, startIdx, middleIdx, mainArray, animations);
    mergeSortHelper(auxiliaryArray, middleIdx + 1, endIdx, mainArray, animations);
    doMerge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations);
  }
  
  function doMerge(mainArray,startIdx,middleIdx,endIdx,auxiliaryArray,animations) {
    let k = startIdx;
    let i = startIdx;
    let j = middleIdx + 1;
    while (i <= middleIdx && j <= endIdx) {
      // These are the values that we're comparing; we push them once
      // to change their color.
      animations.push([i, j]);
      // These are the values that we're comparing; we push them a second
      // time to revert their color.
      animations.push([i, j]);
      if (auxiliaryArray[i] <= auxiliaryArray[j]) {
        // We overwrite the value at index k in the original array with the
        // value at index i in the auxiliary array.
        animations.push([k, auxiliaryArray[i]]);
        mainArray[k++] = auxiliaryArray[i++];
      } else {
        // We overwrite the value at index k in the original array with the
        // value at index j in the auxiliary array.
        animations.push([k, auxiliaryArray[j]]);
        mainArray[k++] = auxiliaryArray[j++];
      }
    }
    while (i <= middleIdx) {
      // These are the values that we're comparing; we push them once
      // to change their color.
      animations.push([i, i]);
      // These are the values that we're comparing; we push them a second
      // time to revert their color.
      animations.push([i, i]);
      // We overwrite the value at index k in the original array with the
      // value at index i in the auxiliary array.
      animations.push([k, auxiliaryArray[i]]);
      mainArray[k++] = auxiliaryArray[i++];
    }
    while (j <= endIdx) {
      // These are the values that we're comparing; we push them once
      // to change their color.
      animations.push([j, j]);
      // These are the values that we're comparing; we push them a second
      // time to revert their color.
      animations.push([j, j]);
      // We overwrite the value at index k in the original array with the
      // value at index j in the auxiliary array.
      animations.push([k, auxiliaryArray[j]]);
      mainArray[k++] = auxiliaryArray[j++];
    }
  }

  export function getQuickSortAnimations(array) {
    const animations = [];
    if (array.length <= 1) return animations;
    quickSortHelper(array, 0, array.length - 1, animations);
    return animations;
  }
  
  function quickSortHelper(array, startIdx, endIdx, animations) {
    if (startIdx < endIdx) {
      const pivotIdx = partition(array, startIdx, endIdx, animations);
      quickSortHelper(array, startIdx, pivotIdx - 1, animations);
      quickSortHelper(array, pivotIdx + 1, endIdx, animations);
    }
  }
  
  function partition(array, startIdx, endIdx, animations) {
    const pivot = array[endIdx];
    let i = startIdx - 1;
    for (let j = startIdx; j < endIdx; j++) {
      animations.push(["compare", j, endIdx]); // Compare pivot and current element
      animations.push(["revert", j, endIdx]);  // Revert color change
      if (array[j] < pivot) {
        i++;
        animations.push(["compare", i, j]);    // Compare elements to swap
        animations.push(["swap", i, array[j]]); // Swap height i with height j
        animations.push(["swap", j, array[i]]); // Swap height j with height i
        animations.push(["revert", i, j]);     // Revert color change
        [array[i], array[j]] = [array[j], array[i]];
      }
    }
    animations.push(["compare", i + 1, endIdx]); // Compare elements to swap
    animations.push(["swap", i + 1, array[endIdx]]); // Swap height i+1 with pivot
    animations.push(["swap", endIdx, array[i + 1]]); // Swap pivot with height i+1
    animations.push(["revert", i + 1, endIdx]);  // Revert color change
    [array[i + 1], array[endIdx]] = [array[endIdx], array[i + 1]];
    return i + 1;
  }

  export function getHeapSortAnimations(array) {
    const animations = [];
    if (array.length <= 1) return animations;
    heapSort(array, animations);
    return animations;
  }
  
  function heapSort(array, animations) {
    const n = array.length;
  
    // Build max heap
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
      heapify(array, n, i, animations);
    }
  
    // One by one extract an element from heap
    for (let i = n - 1; i > 0; i--) {
      // Move current root to end
      animations.push(["swap", 0, array[i]]);
      animations.push(["swap", i, array[0]]);
      [array[0], array[i]] = [array[i], array[0]];
  
      // Call max heapify on the reduced heap
      heapify(array, i, 0, animations);
    }
  }
  
  function heapify(array, n, i, animations) {
    let largest = i;
    const left = 2 * i + 1;
    const right = 2 * i + 2;
  
    // If left child is larger than root
    if (left < n && array[left] > array[largest]) {
      animations.push(["compare", left, largest]);
      animations.push(["revert", left, largest]);
      largest = left;
    }
  
    // If right child is larger than largest so far
    if (right < n && array[right] > array[largest]) {
      animations.push(["compare", right, largest]);
      animations.push(["revert", right, largest]);
      largest = right;
    }
  
    // If largest is not root
    if (largest !== i) {
      animations.push(["compare", i, largest]);
      animations.push(["swap", i, array[largest]]);
      animations.push(["swap", largest, array[i]]);
      animations.push(["revert", i, largest]);
      [array[i], array[largest]] = [array[largest], array[i]];
  
      // Recursively heapify the affected sub-tree
      heapify(array, n, largest, animations);
    }
  }

  export function getBubbleSortAnimations(array){
    const animations = [];
    if (array.length <= 1) return array;
    bubbleSortHelper(array, array.length, animations);
    return animations;
  }

  function bubbleSortHelper(array, n, animations) {
    var swapped;
    for (let i = 0; i < n - 1; i++) {
      swapped = false;
      for (let j = 0; j < n - 1 - i; j++) {
        // Push the comparison of the two elements
        animations.push([j, j + 1]);
        // Revert the color change
        animations.push([j, j + 1]);
        if (array[j] > array[j + 1]) {
          // Swap the elements
          animations.push([j, array[j + 1]]);
          animations.push([j + 1, array[j]]);
          const temp = array[j];
          array[j] = array[j + 1];
          array[j + 1] = temp;
          swapped = true;
        } else {
          // No swap, just push the current state
          animations.push([j, array[j]]);
          animations.push([j + 1, array[j + 1]]);
        }
      }
      if (swapped == false)
        break;
    }
  }

  export function getSelectionSortAnimations(array){
    const animations = [];
    if (array.length <= 1) return array;
    selectionSortHelper(array, array.length, animations);
    return animations;
  }

  function selectionSortHelper(array, n, animations){
    var i, j, min;
    for(i = 0; i < n - 1; i++){
      min = i;
      for (j = i + 1; j < n; j++){
        animations.push(["compare", j, min]);
        animations.push(["revert", j, min]);
        if(array[j] < array[min]){
          min = j;
        }
      }

      if(i != min){
        animations.push(["compare", i, min]);
        swap(array, i, min, animations);
        animations.push(["revert", i, min]);
      }
    }
  }

  function swap(array, i, j, animations){
    animations.push(["swap", i, array[j]]);
    animations.push(["swap", j, array[i]]);
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }

  export function getInsertionSortAnimations(array){
    const animations = [];
    if (array.length <= 1) return array;
    insertionSortHelper(array, array.length, animations);
    return animations;
  }

  function insertionSortHelper(array, n, animations) {
    for (let i = 1; i < n; i++) {
      let key = array[i];
      let j = i - 1;
      while (j >= 0 && array[j] > key) {
        animations.push(["compare", j, j + 1]); // Compare current element with the key
        animations.push(["revert", j, j + 1]);  // Revert color change
        animations.push(["swap", j + 1, array[j]]); // Swap height j+1 with height j
        array[j + 1] = array[j];
        j--;
      }
      animations.push(["compare", j + 1, i]); // Compare for the insertion
      animations.push(["revert", j + 1, i]);  // Revert color change
      animations.push(["swap", j + 1, key]); // Place key in its correct position
      array[j + 1] = key;
    }
  }
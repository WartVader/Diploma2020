function Merge(arr, index, by) {
	//Если эта функция используется при использовании сортировки, то arr1 и arr2 должны быть отсортированы
	var newarr = [];
	var len = arr.length;
	var i = 0,
		j = 0;
	var l = 0,
		r = index; // l - left, r - right
	var ls = false; //ls - left stopped
	var rs = false; //rs - right stopped

	while (i < len) {
		if (!ls && (r >= len || arr[r].recPoints == null || arr[l].recPoints >= arr[r].recPoints || rs)) {
			newarr[i] = arr[l++];

			if (l % index == 0) {
				ls = true;
				if (l != len - 1) l = l + index;
			}
			i++;
		} else if (!rs && (l >= len || arr[l].recPoints == null || arr[l].recPoints <= arr[r].recPoints || ls)) {
			newarr[i] = arr[r++];
			if (r % index == 0) {
				rs = true;
				if (r != len - 1) r = r + index;
			}
			i++;
		} else if (rs && ls) {
			rs = false;
			ls = false;
		}
	}
	return newarr;
}

function MergeSort(array, by) {
	var i = 1;
	var len = array.length;

	while (i < len) {
		array = Merge(array, i);
		i *= 2;
	}

	return array;
}

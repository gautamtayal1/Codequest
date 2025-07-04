#include <iostream>
#include <vector>
#include <string>

// ##USER_CODE_HERE##

int main() {
  int size_arr; std::cin >> size_arr;
  std::vector<int> arr(size_arr);
  for(int i = 0; i < size_arr; i++) std::cin >> arr[i];

  int size_arr2; std::cin >> size_arr2;
  std::vector<int> arr2(size_arr2);
  for(int i = 0; i < size_arr2; i++) std::cin >> arr2[i];

  int result = multiplyNumbers(arr, arr2);
  std::cout << result << std::endl;
  return 0;
}
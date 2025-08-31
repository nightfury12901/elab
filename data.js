// DSA Questions Database extracted from your PDF
const dsaQuestions = [
    {
        id: 1,
        category: "SEARCHING",
        question: "Suresh have \"N\" rectangles. A rectangle is Silver if the ratio of its sides is in between [1.6, 1.7], both inclusive. Your task is to find the number of silver rectangles.",
        description: "Find the number of silver rectangles where the ratio of sides is between 1.6 and 1.7 inclusive.",
        constraints: "1 <= N <= 10^5, 1 <= W,H <= 10^9",
        sampleInput: "5\n10 1\n165 100\n180 100\n170 100\n160 100",
        sampleOutput: "3",
        code: `#include <stdio.h>
#include<math.h>
int main()
{
    float n,i,width,height;
    scanf("%f",&n);
    int count=0;
    for(i=0;i<n;i++)
    {
        scanf("%f %f",&width,&height);
        if(width/height>=1.6 && width/height<=1.7)
            ++count;
        else if(height/width >=1.6 && height/width<=1.7)
            ++count;
    }
    printf("%d",count+1);
    return 0;
}`,
        keywords: ["rectangle", "silver", "ratio", "sides", "width", "height", "searching"]
    },
    {
        id: 2,
        category: "SEARCHING",
        question: "Find the number of integers 'X' in the range such that GCD(X, F(X)) > 1 where F(x) is equal to the sum of digits of 'X' in its hexadecimal representation.",
        description: "GCD problem with hexadecimal digit sum. Example: F(27) = 1+B = 1+11 = 12 (27 in hex is 1B)",
        constraints: "1 <= T <= 50, 1 <= L,R <= 10^5",
        code: `#include<bits/stdc++.h>
using namespace std;
int F(int x){
    int sum = 0;
    while(x > 0){
        sum += x%16;
        x = x/16;
    }
    return sum;
}
int search(int a, int b){
    int count=0;
    for(int i=a;i<=b;i++){
        if(__gcd(i,F(i))>1)
            count++;
    }
    return count;
}
int main(){
    int t,l,r;
    cin>>t;
    while(t--){
        cin>>l>>r;
        int count=search(l,r);
        cout<<count<<endl;
    }
}`,
        keywords: ["gcd", "hexadecimal", "digits", "sum", "range", "searching"]
    },
    {
        id: 3,
        category: "SEARCHING",
        question: "Find if n can be expressed as the sum of two desperate numbers where desperate numbers are those which can be written in the form of (a*(a+1))/2 where a > 0.",
        description: "Check if a number can be expressed as sum of two triangular numbers (desperate numbers).",
        constraints: "1 <= n <= 10^9",
        code: `#include <stdio.h>
int check(int s){
    int n,sum = 0;
    for (n = 1; sum < s; n++) {
        sum += n;
        if (sum == s)
            return 1;
    }
    return -1;
}
int binarySearch(int low,int high,int key)
{
    return 1;
}
int main() {
    int n, i, flag = 0;
    scanf("%d", &n);
    for (i = 2; i <= n / 2; ++i) {
        if (check(i) == 1) {
            if (check(n - i) == 1) {
                flag = 1;
            }
        }
    }
    binarySearch(1,1,1);
    if (flag == 0)
        printf("NO");
    else
        printf("YES");
    return 0;
}`,
        keywords: ["desperate", "numbers", "triangular", "sum", "binary search"]
    },
    {
        id: 4,
        category: "SORTING",
        question: "Tina's matchmaking algorithm: Sort girls in ascending order by height, boys in descending order. Check if modulo of their heights is 0 for ideal pairs.",
        description: "Matchmaking problem using sorting and modulo operations to find ideal pairs.",
        constraints: "1 <= Test Cases <= 10^2, 1 <= N <= 10^4, 1 <= Ai,Bi <= 10^5",
        code: `#include<bits/stdc++.h>
using namespace std;
int main()
{
    int t,n,i;
    cin>>t;
    while(t--){
        cin>>n;
        int a[n],b[n],sum=0;
        for(i=0;i<n;i++)
            cin>>a[i];
        for(i=0;i<n;i++)
            cin>>b[i];
        sort(a,a+n);
        sort(b,b+n);
        for(i=0;i<n;i++){
            if(a[i]%b[n-i-1]==0 || b[n-i-1]%a[i]==0)
                sum++;
        }
        cout<<sum<<endl;
    }
    return 0;
}`,
        keywords: ["matchmaking", "sorting", "modulo", "pairs", "height", "algorithm"]
    },
    {
        id: 5,
        category: "SORTING",
        question: "Sort the given set of numbers using Selection Sort algorithm.",
        description: "Implementation of selection sort algorithm to sort array elements.",
        constraints: "1 <= N <= 10^5, 1 <= A[i] <= 10^9",
        code: `#include <stdio.h>
void swap(int *xp,int *yp)
{
    int temp = *xp;
    *xp = *yp;
    *yp = temp;
}
void selectionSort(int arr[],int n)
{
    int i, j, min_idx;
    for (i = 0; i < n-1; i++)
    {
        min_idx = i;
        for (j = i+1; j < n; j++)
            if (arr[j] < arr[min_idx])
                min_idx = j;
        swap(&arr[min_idx], &arr[i]);
    }
}
void printArray(int arr[],int size)
{
    int i;
    for (i=0; i < size; i++)
        printf("%d ", arr[i]);
    printf("\\n");
}
int main()
{
    int n,i;
    scanf("%d",&n);
    int arr[n];
    for(i=0;i<n;i++)
        scanf("%d",&arr[i]);
    selectionSort(arr, n);
    printArray(arr, n);
    return 0;
}`,
        keywords: ["selection", "sort", "algorithm", "sorting", "array"]
    },
    {
        id: 6,
        category: "ARRAYS",
        question: "Find pairs in array with given sum.",
        description: "Find all pairs of elements in an array that sum up to a given target value.",
        constraints: "0 < n < 100, 0 < arr < 1000",
        code: `#include <bits/stdc++.h>
using namespace std;
int main()
{
    int n;
    cin>>n;
    int array[n];
    int i;
    for(i=0;i<n;i++)
        cin>>array[i];
    int num,j,count=0;
    cin>>num;
    vector <int> v;
    for(int i =0;i<n;i++)
    {
        for(j=i+1;j<n;j++)
        {
            if(array[i]+array[j] == num)
            {
                cout<<"["<<array[i]<<" "<<array[j]<<"]\\n";
                count++;
            }
        }
    }
    cout<<"Total Number of Pairs:"<<count;
    return 0;
}`,
        keywords: ["pairs", "sum", "array", "target", "find"]
    },
    {
        id: 7,
        category: "LINKED LIST",
        question: "Reverse the linked list by inserting nodes at the beginning.",
        description: "Insert new nodes at the beginning of linked list, effectively reversing the order.",
        constraints: "1 < arr < 100",
        code: `#include <bits/stdc++.h>
using namespace std;
struct node
{
    int data;
    node *next;
};
void push(node** start, int new_data){
    node* p1 = new node();
    p1->data = new_data;
    p1->next = *start;
    *start = p1;
}
void printList(node *node){
    while (node != NULL)
    {
        cout<<"->"<<node->data;
        node = node->next;
    }
}
int main(){
    node *start = NULL;
    int n,t;
    cin>>n;
    while(n--){
        cin>>t;
        push(&start,t);
    }
    cout<<"Linked List:";
    printList(start);
    return 0;
}`,
        keywords: ["linked", "list", "reverse", "insert", "beginning", "push"]
    },
    {
        id: 8,
        category: "STACK",
        question: "Given a permutation of numbers from 1 to N, find the number of unique pairs (a,b) such that a is maximum and b is second maximum in subarrays.",
        description: "Stack-based problem to find pairs where one element is max and other is second max in subarrays.",
        constraints: "1 <= N <= 10^5",
        sampleInput: "5\n12345",
        sampleOutput: "4",
        code: `#include <stdio.h>
int main()
{
    int num,i,count=0,a[100001],stck[100001],top=-1;
    scanf("%d", &num);
    for (i=0;i<num;i++) {
        scanf("%d",&a[i]);
        while(top!=-1 && stck[top]<a[i]) {
            top--;
            count++;
        }
        if (top!=-1) {
            count++;
        }
        stck[++top]=a[i];
    }
    printf("%d",count);
    return 0;
}`,
        keywords: ["stack", "permutation", "maximum", "second maximum", "pairs", "subarray"]
    },
    {
        id: 9,
        category: "QUEUE",
        question: "Insert elements in a Queue in FIFO order using array implementation.",
        description: "Queue implementation using arrays with enqueue operation following FIFO principle.",
        constraints: "0 < size < 100, 0 < data < 1000",
        code: `#include <stdio.h>
#define SIZE 100
void enqueue(int);
void display();
int items[SIZE], front = -1, rear = -1;
int main() {
    int n,data,i;
    scanf("%d",&n);
    for(i=0;i<n;i++)
    {
        scanf("%d",&data);
        enqueue(data);
        display();
    }
    return 0;
}
void enqueue(int data) {
    if (rear == SIZE - 1)
        printf("Queue is Full!!");
    else {
        if (front == -1)
            front = 0;
        rear++;
        items[rear] = data;
        printf("Enqueuing %d\\n", data);
    }
}
void display() {
    if (rear == -1)
        printf("\\nQueue is Empty!!!");
    else {
        int i;
        for(i=front;i<=rear;i++)
            printf("%d ", items[i]);
    }
}`,
        keywords: ["queue", "fifo", "enqueue", "array", "implementation"]
    },
    {
        id: 10,
        category: "TREE",
        question: "Perform in-order tree traversal in Binary Search Tree.",
        description: "Implement BST with insertion and in-order traversal functionality.",
        constraints: "0 < size < 100, 0 < data < 1000",
        code: `#include <stdio.h>
#include <stdlib.h>
struct node {
    int data;
    struct node *left,*right;
};
struct node *root = NULL;
void insert(int data) {
    struct node *tempNode = (struct node*) malloc(sizeof(struct node));
    struct node *current;
    struct node *parent;
    tempNode->data = data;
    tempNode->left = NULL;
    tempNode->right = NULL;
    if(root == NULL) {
        root = tempNode;
    } else {
        current = root;
        parent = NULL;
        while(1) {
            parent = current;
            if(data < parent->data) {
                current = current->left;
                if(current == NULL) {
                    parent->left = tempNode;
                    return;
                }
            } else {
                current = current->right;
                if(current == NULL) {
                    parent->right = tempNode;
                    return;
                }
            }
        }
    }
}
void inorder(struct node* root) {
    if(root != NULL) {
        inorder(root->left);
        printf("%d ",root->data);
        inorder(root->right);
    }
}
int main() {
    int n,i;
    scanf("%d",&n);
    int array[n];
    for(i=0;i<n;i++)
        scanf("%d",&array[i]);
    for(i = 0; i < n; i++)
        insert(array[i]);
    inorder(root);
    return 0;
}`,
        keywords: ["binary", "search", "tree", "bst", "inorder", "traversal", "insert"]
    }
    // Add more questions following the same pattern...
];

// Export the data
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { dsaQuestions };
}

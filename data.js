// Complete DSA Questions Database from SRM Elab PDF
const dsaQuestions = [
    // SEARCHING (1-4)
    {
        id: 1,
        category: "SEARCHING",
        question: "Suresh have \"N\" rectangles. A rectangle is Silver if the ratio of its sides is in between [1.6, 1.7], both inclusive. Your task is to find the number of silver rectangles.",
        description: "Find rectangles where the ratio of sides falls between 1.6 and 1.7 (inclusive).",
        constraints: "1 <= N <= 10^5, 1 <= W,H <= 10^9",
        sampleInput: "5
        10 1
        165 100
        180 100
        170 100
        160 100",
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
        keywords: ["rectangle", "silver", "ratio", "sides", "searching"]
    },
    {
        id: 2,
        category: "SEARCHING",
        question: "Find the number of integers 'X' in the range such that GCD(X, F(X)) > 1 where F(x) is equal to the sum of digits of 'X' in its hexadecimal representation.",
        description: "Find integers where GCD with their hexadecimal digit sum is greater than 1. Example: F(27) = 1+B = 1+11 = 12",
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
        keywords: ["gcd", "hexadecimal", "digits", "sum", "range"]
    },
    {
        id: 3,
        category: "SEARCHING",
        question: "Find if n can be expressed as the sum of two desperate numbers where desperate numbers are those which can be written in the form of (a*(a+1))/2 where a > 0.",
        description: "Check if a number can be expressed as sum of two triangular numbers.",
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
        category: "SEARCHING", 
        question: "Simon has N ratios A/B. The values of B are incorrect. The actual values are B+R. Simon knows the actual sum K. Determine R.",
        description: "Binary search problem to find the correction value R for ratios.",
        constraints: "1 <= N <= 1000, 1 <= A <= 1000, |B| <= 1000, 1 <= K <= 10^6",
        code: `#include<iostream>
        using namespace std;
        double func(double arr[][2],double r,int n){
            double ans = 0;
            for (int i = 0; i < n; i++) {
                ans+= (arr[i][0]/(arr[i][1]+r));
            }
            return ans;
        }
        int main(){
            int n,two;
            cin>>n>>two;
            double arr[n][2];
            for (int i = 0; i < n; i++) {
                cin>>arr[i][0]>>arr[i][1];
            }
            double hi=2000,lo=0,mid,curr,k;
            cin>>k;
            while(hi-lo>1e-7){
                mid=(hi+lo)/2;
                curr=func(arr,mid,n);
                if(curr<k){
                    hi = mid;
                }
                else{
                    lo = mid + 1e-7;
                }
            }
            printf("%.6f",mid);
            return 0;
        }`,
        keywords: ["ratios", "binary search", "precision", "correction"]
    },

    // SORTING (5-9)
    {
        id: 5,
        category: "SORTING",
        question: "Tina's matchmaking algorithm: Sort girls in ascending order by height, boys in descending order. Check if modulo of their heights is 0 for ideal pairs.",
        description: "Matchmaking using sorting and modulo operations to find compatible pairs.",
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
        keywords: ["matchmaking", "sorting", "modulo", "pairs"]
    },
    {
        id: 6,
        category: "SORTING",
        question: "Sort the given set of numbers using Selection Sort algorithm.",
        description: "Implementation of selection sort algorithm.",
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
            printf("\&");
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
        keywords: ["selection", "sort", "algorithm", "sorting"]
    },
    {
        id: 7,
        category: "SORTING",
        question: "Find the longest subarray where the absolute difference between any two elements is less than or equal to 1.",
        description: "Find longest contiguous subarray with max difference <= 1.",
        constraints: "2 <= n <= 100, 0 < a[i] < 100",
        code: `#include <bits/stdc++.h>
        #define f(i,a,n) for(i=a;i<n;i++)
        using namespace std;
        int computeLongestSubarray(int arr[], int k, int n)
        {
            int j,i, maxLength = 1;
            f(i,0,n)
            {
                int minOfSub = arr[i];
                int maxOfSub = arr[i];
                f(j,i+1,n)
                {
                    if (arr[j] > maxOfSub)
                        maxOfSub = arr[j];
                    if (arr[j] < minOfSub)
                        minOfSub = arr[j];
                    if ((maxOfSub - minOfSub) <= k)
                    {
                        int currLength = j - i + 1;
                        if (maxLength < currLength)
                            maxLength = currLength;
                    }
                }
            }
            return maxLength;
        }
        int main()
        {
            int n,i;
            cin>>n;
            int arr[n];
            f(i,0,n)
                cin>>arr[i];
            int k = 1;
            sort(arr,arr+n);
            int maxLength = computeLongestSubarray(arr, k, n);
            cout << (maxLength);
            return 0;
        }`,
        keywords: ["longest", "subarray", "difference", "sorting"]
    },
    {
        id: 8,
        category: "SORTING",
        question: "Vehicle driver needs minimum petrol units to cover all sub-tracks. If car can't cover a sub-track, add petrol (1 unit = 1 km extra).",
        description: "Greedy algorithm to find minimum fuel needed after sorting distances.",
        code: `#include <stdio.h>
        void sort(int a[],int n){
            int t,i,j;
            for(i=0;i<n-1;i++)
                for(j=0;j<n-i-1;j++)
                    if(a[i]>a[i+1]){
                        t=a[i]; a[i]=a[i+1]; a[i+1]=t;
                    }
        }
        int main(){
            int A[100],T,K,N,check=0,i;
            scanf("%d",&T);
            while(T--){
                int temp,temp2=0;
                check=0;
                scanf("%d",&N);
                scanf("%d",&K);
                for(i=0;i<N;i++){
                    scanf("%d",&A[i]);
                }
                sort(A,N);
                for(i=0;i<N;i++)
                    if(A[i]>=K){
                        temp = A[i]-K;
                        K+=temp;
                        temp2 += temp;
                        check=1;
                    }
                if(check==0)
                    printf("-1");
                else
                    printf("%d",temp2);
                printf("\&");
            }
            return 0;
        }`,
        keywords: ["vehicle", "petrol", "minimum", "greedy"]
    },
    {
        id: 9,
        category: "SORTING",
        question: "Find all elements in array which have at least two greater elements than themselves.",
        description: "Sort array and return all except the two largest elements.",
        constraints: "1 <= N <= 1000",
        code: `#include <bits/stdc++.h>
        using namespace std;
        void swap(int *xp, int *yp)
        {
            int temp = *xp;
            *xp = *yp;
            *yp = temp;
        }
        void sort(int a[],int n){
            int i, j;
            for(i=0;i<n-1;i++)
                for(j=0;j<n-i-1;j++)
                    if (a[j] > a[j+1])
                        swap(&a[j], &a[j+1]);
        }
        int main()
        {
            int t,n;
            cin>>t;
            while(t--){
                cin>>n;
                int a[n];
                for(int i=0;i<n;i++)
                    cin>>a[i];
                sort(a,n);
                for(int i=0;i<n-2;i++)
                    cout<<a[i]<<" ";
                cout<<endl;
            }
            return 0;
        }`,
        keywords: ["elements", "greater", "sorting", "interview"]
    },

    // ARRAYS (10-15)
    {
        id: 10,
        category: "ARRAYS",
        question: "Create a matrix of size p x q where elements are either Y or O, filled alternatively in concentric rectangles.",
        description: "Spiral matrix filling with alternating characters Y and O.",
        constraints: "1 <= p,q <= 1000",
        code: `#include <bits/stdc++.h>
        using namespace std;
        void fill0X(int m, int n)
        {
            int i, k = 0, l = 0,r = m, c = n;
            char a[m][n], x = 'Y';
            while (k < m && l < n)
            {
                for (i = l; i < n; ++i)a[k][i] = x;
                k++;
                i=k;
                while(i < m)a[i][n-1] = x,i++;
                n--;
                if (k < m)
                    for (i = n; i >= l; --i)a[m-1][i] = x;m--;
                if (l < n)
                    for (i = m; i >= k; --i)a[i][l] = x;
                l++;x = (x == '0')? 'Y': '0';
            }
            for (i = 0; i < r; i++)
            {
                for (int j = 0; j < c; j++)
                {
                    cout << a[i][j];
                    if(j < c-1)
                        cout<<" ";
                }
                cout <<"\
        ";
            }
        }
        int main()
        {
            int m,n;
            cin>>m>>n;
            fill0X(m, n);
        }`,
        keywords: ["matrix", "spiral", "alternating", "rectangles"]
    },
    {
        id: 11,
        category: "ARRAYS",
        question: "Sort array in waveform. Method: 1) Sort in ascending order 2) Swap adjacent elements.",
        description: "TCS interview question - create wave form by sorting then swapping adjacent elements.",
        code: `#include <bits/stdc++.h>
        using namespace std;
        int main()
        {
            int n;
            cin>>n;
            int array[n];
            for(int i=0;i<n;i++)
            {
                cin>>array[i];
            }
            sort(array,array + n);
            int i;
            for(i=0;i<n;i++)
            {
                swap(array[i],array[i+1]);
                i++;
            }
            for(int s : array)
                cout<<s<<" ";
            return 0;
        }`,
        keywords: ["waveform", "sorting", "swapping", "tcs", "interview"]
    },
    {
        id: 12,
        category: "ARRAYS",
        question: "Find pairs in Array with given sum.",
        description: "Find all pairs of elements that sum to a target value.",
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
                        cout<<"["<<array[i]<<" "<<array[j]<<"]\
        ";
                        count++;
                    }
                }
            }
            cout<<"Total Number of Pairs:"<<count;
            return 0;
        }`,
        keywords: ["pairs", "sum", "target", "array"]
    },
    {
        id: 13,
        category: "ARRAYS",
        question: "Find the element of array which occurs most times in the array.",
        description: "Find the most frequent element using hash map.",
        constraints: "0 < n < 100, 0 < arr < 1000",
        code: `#include <bits/stdc++.h>
        using namespace std;
        int main()
        {
            int n;
            cin>>n;
            int arr[n];
            for(int i=0;i<n;i++)
            {
                cin>>arr[i];
            }
            int i;
            unordered_map<int,int> hash;
            for(i= 0;i< n;i++)
                hash[arr[i]]++;
            int max_count=0,res=-1;
            for (auto i: hash) {
                if (max_count <i.second) {
                    res = i.first;
                    max_count = i.second;
                }
            }
            cout<<res<<"\
        ";
            return 0;
        }`,
        keywords: ["frequency", "most", "occurring", "hashmap"]
    },
    {
        id: 14,
        category: "ARRAYS",
        question: "Minimum smoke when mixing adjacent colored mixtures. Smoke = a*b, resulting color = (a+b) mod 100.",
        description: "Dynamic programming problem for optimal matrix chain multiplication variant.",
        constraints: "1 <= n <= 100",
        code: `#include <bits/stdc++.h>
        using namespace std;
        int main(){
            int n;
            cin>>n;
            while(n!=-1)
            {
                long long a[n];
                for(int i=0;i<n;i++)
                {
                    cin>>a[i];
                }
                vector<vector<long long>>dp(n,vector<long long>(n+1,10000000000000000));
                long long sum[n][n+1];
                for(int i=0;i<n;i++)
                {
                    sum[i][1]=a[i];
                    dp[i][1]=0;
                }
                for(int len=2;len<=n;len++)
                {
                    for(int i=0;i<=n-len;i++)
                    {
                        for(int j=1;j<len;j++)
                        {
                            sum[i][len]=(sum[i][j]+sum[i+j][len-j])%100;
                            long long x=dp[i][j]+dp[i+j][len-j]+(sum[i][j]*sum[i+j][len-j]);
                            dp[i][len]=min(x,dp[i][len]);
                        }
                    }
                }
                cout<<dp[0][n]<<endl;
                n=-1;cin>>n;
            }
            return 0;
        }`,
        keywords: ["mixtures", "smoke", "dynamic", "programming"]
    },
    {
        id: 15,
        category: "ARRAYS",
        question: "Find sum of all elements inside a submatrix given coordinates (X1,Y1) to (X2,Y2).",
        description: "Calculate sum of elements in a rectangular region of matrix.",
        constraints: "1 <= T <= 15, 1 <= N,M <= 10^3, 1 < C[N][M] <= 10^6",
        code: `#include <iostream>
        using namespace std;
        int main()
        {
            int t;
            cin>>t;
            while(t--)
            {
                int m,n;
                cin>>m>>n;
                int C[m][n];
                for(int i = 0; i < m;i++)
                {
                    for(int j = 0; j<n; j++)
                    {
                        cin>>C[i][j];
                    }
                }
                int a,b,x,y;
                cin>>a>>b>>x>>y;
                int sum = 0;
                for(int i = a-1; i <= x-1;i++)
                {
                    for(int j = b-1; j <=y-1; j++)
                    {
                        sum += C[i][j];
                    }
                }
                cout<<sum<<"\
        ";
            }
            return 0;
        }`,
        keywords: ["submatrix", "sum", "coordinates", "rectangle"]
    },

    // LINKED LIST (16-21)
    {
        id: 16,
        category: "LINKED LIST",
        question: "Reverse the linked list by inserting nodes at the beginning (push operation).",
        description: "Insert elements at head to effectively reverse the list order.",
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
        keywords: ["linked", "list", "reverse", "push", "insert"]
    },
    {
        id: 17,
        category: "LINKED LIST",
        question: "Insert a new node after a given node in linked list.",
        description: "Add node after specified value, handle case when node not found.",
        constraints: "1 < arr < 100",
        code: `#include <stdio.h>
        #include<stdlib.h>
        struct node {
            int data;
            struct node *next;
        };
        struct node *start,*t,*p2,*p1;
        int n,valtoinsert,c=0;
        void create(){
            t=(struct node *)malloc(sizeof(struct node));
            scanf("%d",&t->data);
            t->next=NULL;
            if(start==NULL){
                start=t;
            }  else
            {
                p2=start;
                while(p2->next!=NULL){
                    p2=p2->next;
                }
                p2->next=t;
            }
        }
        void display(){
            p1=(struct node*)malloc(sizeof(struct node));
            scanf("%d%d",&valtoinsert,&p1->data);
            p1->next=NULL;
            p2=start;
            while(p2){
                if(valtoinsert==p2->data){
                    c++;
                    p1->next=p2->next;
                    p2->next=p1;
                }
                p2=p2->next;
            }
            printf(c==0?"Node not found! Linked List:":"Linked List:");
            p2=start;
            while(p2){
                printf("->%d",p2->data);
                p2=p2->next;
            }
        }
        int main (){
            scanf("%d",&n);
            while(n--){
                create();
            }
            display();
            return 0;
        }`,
        keywords: ["insert", "after", "node", "linked", "list"]
    },
    {
        id: 18,
        category: "LINKED LIST",
        question: "Count number of occurrences of given key in linked list.",
        description: "Search and count frequency of a specific value in linked list.",
        constraints: "1 < N < 1000, 1 < X < 1000",
        code: `#include <bits/stdc++.h>
        using namespace std;
        struct node
        {
            int key;
            struct node *next;
        };
        void push(struct node** head_ref, int new_key)
        {
            struct node* new_node = new node();
            new_node->key = new_key;
            new_node->next = (*head_ref);
            (*head_ref) = new_node;
        }
        void printList(node *node){
            while (node != NULL)
            {
                cout<<"-->"<<node->key;
                node = node->next;
            }
        }
        int count(struct node* head,int search_for)
        {
            node* current = head;
            int count=0;
            while (current != NULL)
            {
                if (current->key == search_for)
                    count++;
                current = current->next;
            }
            return count;
        }
        int main()
        {
            struct node* head = NULL;
            int x,n,t;
            cin>>n;
            while(n--){
                cin>>t;
                push(&head,t);
            }
            cin>>x;
            cout<<"Linked list:";
            printList(head);
            cout<<endl<<"Count of "<<x<<":"<<count(head, x);
            return 0;
        }`,
        keywords: ["count", "occurrences", "key", "linked", "list"]
    },
    {
        id: 19,
        category: "LINKED LIST",
        question: "Delete D nodes from the beginning of the linked list.",
        description: "Remove first D nodes by moving head pointer D times.",
        constraints: "1 < N < 1000, 1 < P < N",
        code: `#include<bits/stdc++.h>
        using namespace std;
        struct node {
            int data;
            node *next;
        };
        void insertAtEnd(node** head_ref, int new_data) {
            node* new_node = (node*)malloc(sizeof( node));
            node* last = *head_ref;
            new_node->data = new_data;
            new_node->next = NULL;
            if (*head_ref == NULL) {
                *head_ref = new_node;
                return;
            }
            while (last->next != NULL) last = last->next;
            last->next = new_node;
            return;
        }
        int main() {
            node* head = NULL;
            int n,c,z,i;
            cin>>n;
            for(i=0;i<n;i++){
                cin>>c;
                insertAtEnd(&head,c);
            }
            cin>>z;
            for(int i=0;i<z;i++)
                head=head->next;
            cout << "Linked List:";
            node* node=head;
            while(node!=NULL){
                cout<<"->"<<node->data;
                node=node->next;
            }
            return 0;
        }`,
        keywords: ["delete", "beginning", "nodes", "linked", "list"]
    },
    {
        id: 20,
        category: "LINKED LIST",
        question: "Insertion in a Doubly Linked list at beginning.",
        description: "Insert new nodes at the start of doubly linked list, print forward and backward.",
        constraints: "0 < N < 100, 0 < arr < 1000",
        code: `#include <bits/stdc++.h>
        using namespace std;
        struct Node
        {
            int data;
            struct Node *next;
            struct Node *prev;
        };
        void insertStart(struct Node** head,int data)
        {
            struct Node* new_node = new Node();
            new_node->data = data;
            new_node->next = (*head);
            new_node->prev = NULL;
            if ((*head) != NULL)
                (*head)->prev = new_node;
            (*head) = new_node;
        }
        void printList(struct Node* node)
        {
            Node* last;
            while (node != NULL)
            {
                cout<<node->data<<" ";
                last = node;
                node = node->next;
            }
            cout<<endl;
            while (last != NULL)
            {
                cout<<last->data<<" ";
                last = last->prev;
            }
        }
        int main()
        {
            struct Node* head = NULL;
            int n;
            cin>>n;
            for(int i=0;i<n;i++){
                int t;
                cin>>t;
                insertStart(&head, t);
            }
            printList(head);
            return 0;
        }`,
        keywords: ["doubly", "linked", "list", "insert", "beginning"]
    },
    {
        id: 21,
        category: "LINKED LIST",
        question: "Search for a given key in singly linked list (iterative approach).",
        description: "Linear search in linked list, return true if found, false otherwise.",
        constraints: "1 < N < 1000, 1 < X < 1000",
        code: `#include <bits/stdc++.h>
        using namespace std;
        struct node
        {
            int key;
            struct node* next;
        };
        void push(struct node** head_ref, int new_key)
        {
            struct node* new_node = new node();
            new_node->key = new_key;
            new_node->next = (*head_ref);
            (*head_ref) = new_node;
        }
        bool search(struct node* head,int x)
        {
            node* current = head;
            while (current != NULL)
            {
                if (current->key == x)
                    return true;
                current = current->next;
            }
            return false;
        }
        int main()
        {
            struct node* head = NULL;
            int x,n,t;
            cin>>n;
            while(n--){
                cin>>t;
                push(&head,t);
            }
            cin>>x;
            search(head, x)? cout<<"Yes" : cout<<"No";
            return 0;
        }`,
        keywords: ["search", "linked", "list", "iterative", "key"]
    },

    // STACK (22-25)
    {
        id: 22,
        category: "STACK",
        question: "Find number of unique pairs (a,b) where a is maximum and b is second maximum in subarrays.",
        description: "Use stack to find pairs where elements are max and second max in some subarray.",
        constraints: "1 <= N <= 10^5",
        sampleInput: "5
12345",
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
        keywords: ["stack", "maximum", "second", "pairs", "subarray"]
    },
    {
        id: 23,
        category: "STACK",
        question: "Remove exactly K elements from stack/queue to maximize sum. Can convert stack to queue once.",
        description: "Dynamic programming on stack/queue conversion to maximize removed elements sum.",
        constraints: "1 <= N <= 10^5, 1 <= Ai <= 10^9",
        code: `#include <bits/stdc++.h>
        using namespace std;
        int main()
        {
            int n,k,i;
            cin>>n>>k;
            int sum = 0;
            int arr[n];
            stack<int>st, st2;
            for(i=0;i<n;i++){
                cin >> arr[i];
                st.push(arr[i]);
            }
            for(i=0;i<k;i++){
                st2.push(arr[i]);
                sum += arr[i];
            }
            int maxs = sum;
            while(k-- > 1){
                sum -= st2.top();
                st2.pop();
                sum += st.top();
                st.pop();
                if(sum > maxs) maxs = sum;
            }
            cout << maxs;
            return 0;
        }`,
        keywords: ["stack", "queue", "maximize", "sum", "conversion"]
    },
    {
        id: 24,
        category: "STACK",
        question: "Convert Postfix expression to Infix using stack.",
        description: "Expression conversion using stack data structure for operand/operator handling.",
        code: `#include<bits/stdc++.h>
        #include<iostream>
        #include<string.h>
        using namespace std;
        bool isOperand(char x){
            return (x>='a' && x<='z') || (x >= 'A' && x <= 'Z');
        }
        string getInfix(string exp)
        {
            stack<string> s;
            for(int i=0; exp[i]!='\0'; i++)
            {
                if(isOperand(exp[i]))
                {
                    string op(1, exp[i]);
                    s.push(op);
                }
                else
                {
                    string op1 = s.top();
                    s.pop();
                    string op2=s.top();
                    s.pop();
                    s.push("(" + op2 + exp[i] + op1 + ")");
                }
            }
            return(s.top());
        }
        int main()
        {
            string exp;
            cin>>exp;
            cout<<getInfix(exp);
            return 0;
        }`,
        keywords: ["postfix", "infix", "conversion", "stack", "expression"]
    },
    {
        id: 25,
        category: "STACK",
        question: "Convert Prefix expression to Postfix using stack.",
        description: "Expression conversion from prefix to postfix notation using stack.",
        code: `#include <iostream>
        #include <stack>
        using namespace std;
        bool isOperator(char x)
        {
            switch (x) {
                case '+':
                case '-':
                case '/':
                case '*':
                    return true;
            }
            return false;
        }
        string preToPost(string pre_exp)
        {
            stack<string> s;
            int length = pre_exp.size();
            for (int i = length - 1; i >= 0; i--)
            {
                if (isOperator(pre_exp[i]))
                {
                    string op1 = s.top();
                    s.pop();
                    string op2 = s.top();
                    s.pop();
                    string temp = op1 + op2 + pre_exp[i];
                    s.push(temp);
                }
                else {
                    s.push(string(1, pre_exp[i]));
                }
            }
            return s.top();
        }
        int main()
        {
            string pre_exp;
            cin>>pre_exp;
            cout << "Postfix:" << preToPost(pre_exp);
            return 0;
        }`,
        keywords: ["prefix", "postfix", "conversion", "stack", "expression"]
    },

    // QUEUE (26-28)
    {
        id: 26,
        category: "QUEUE",
        question: "Insert elements in a Queue in FIFO order using array implementation.",
        description: "Queue implementation with enqueue operation and display.",
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
                printf("Enqueuing %d\
        ", data);
            }
        }
        void display() {
            if (rear == -1)
                printf("\
        Queue is Empty!!!");
            else {
                int i;
                for(i=front;i<=rear;i++)
                    printf("%d ", items[i]);
            }
        }`,
        keywords: ["queue", "fifo", "enqueue", "array", "implementation"]
    },
    {
        id: 27,
        category: "QUEUE",
        question: "String transformation: append #, generate rotations, sort, construct new string from last characters.",
        description: "Complex string manipulation using rotations and sorting (Burrows-Wheeler transform related).",
        constraints: "1 <= n <= 10^6",
        code: `#include<bits/stdc++.h>
        using namespace std;
        int main() {
            int i;
            string s; cin>>s;
            vector<int> v;
            vector<int> a[26];
            int n= s.size();
            for(i=0;i<=n;i++) {
                if (s[i] == '#')
                    v.push_back(i);
                else
                    a[s[i]-'a'].push_back(i);
            }
            for (int i = 0; i < 26; i++) {
                for (auto j: a[i])
                    v.push_back(j);
            }
            string ans;
            int j = v[v[0]];
            while(s[j] != '#') {
                ans += s[j];
                j = v[j];
            }
            cout<<ans;
            return 0;
        }`,
        keywords: ["string", "transformation", "rotations", "sorting"]
    },
    {
        id: 28,
        category: "QUEUE",
        question: "Queue implementation using linked list with FIFO architecture.",
        description: "Linked list based queue implementation with enqueue operation.",
        constraints: "0 < size < 100, 0 < data < 1000",
        code: `#include <stdio.h>
        #include <stdlib.h>
        struct node *front = NULL;
        struct node *rear = NULL;
        struct node
        {
            int data;
            struct node *next;
        };
        void linkedListTraversal(struct node *ptr)
        {
            while (ptr != NULL)
            {
                printf("%d ", ptr->data);
                ptr = ptr->next;
            }
        }
        void enqueue(int d)
        {
            struct node* new_n;
            new_n = (struct node*)malloc(sizeof(struct node));
            if(new_n==NULL){
                printf("Queue is Full");
            }
            else{
                new_n->data = d;
                new_n->next = NULL;
                if(front==NULL){
                    front=rear=new_n;
                }
                else{
                    rear->next = new_n;
                    rear=new_n;
                }
            }
        }
        int main()
        {
            int n,i,t;
            scanf("%d",&n);
            for(i=0;i<n;i++)
            {
                scanf("%d",&t);
                enqueue(t);
            }
            linkedListTraversal(front);
            return 0;
        }`,
        keywords: ["queue", "linked", "list", "fifo", "enqueue"]
    },

    // TREE 1 (29-33)
    {
        id: 29,
        category: "TREE",
        question: "Perform in-order tree traversal in Binary Search Tree.",
        description: "BST implementation with insertion and in-order traversal.",
        constraints: "0 < size < 100, 0 < data < 1000",
        code: `#include <stdio.h>
        #include <stdlib.h>
        struct node {
            int data;
            struct node *left,*right;
        };
        struct node *root = NULL;
        void insert(int data) {
            struct node tempNode = (struct node) malloc(sizeof(struct node));
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
        keywords: ["binary", "search", "tree", "inorder", "traversal"]
    },
    {
        id: 30,
        category: "TREE",
        question: "Remove elements from list at given positions using segment tree.",
        description: "Dynamic list with removal operations using segment tree data structure.",
        constraints: "1 <= n <= 2*10^5, 1 < xi <= 10^9, 1 < pi <= n-i+1",
        code: `#include <stdio.h>
        #define N 200000
        #define N_ (1 << 18)
        int tr[N_ * 2];
        void build(int k,int l,int r) {
            tr[k] = r - l;
            if (r - l > 1) {
                int m = (l + r) / 2;
                build(k * 2 + 1, l, m);
                build(k * 2 + 2, m, r);
            }
        }
        int query(int k, int l, int r, int x) {
            int m, k1, k2;
            tr[k]--;
            if (r - l == 1)
                return r;
            m = (l + r) / 2, k1 = k * 2 + 1, k2 = k * 2 + 2;
            return tr[k1] >= x ? query(k1, l, m, x) : query(k2, m, r, x - tr[k1]);
        }
        int main() {
            int n, h, i, x;
            scanf("%d", &n);
            int aa[n];
            for (i = 0; i < n; i++)
                scanf("%d", &aa[i]);
            build(0, 0, n);
            for (h = 0; h < n; h++) {
                scanf("%d", &x);
                i = query(0, 0, n, x) - 1;
                printf("%d ", aa[i]);
            }
            printf("\
        ");
            return 0;
        }`,
        keywords: ["segment", "tree", "remove", "elements", "positions"]
    },
    {
        id: 31,
        category: "TREE",
        question: "Perform pre-order tree traversal in Binary Search Tree.",
        description: "BST with insertion and pre-order traversal implementation.",
        code: `#include<bits/stdc++.h>
        using namespace std;
        struct node {
            int data;
            struct node *left,*right;
        }*root=NULL;
        void insert(int data) {
            struct node tempNode = (node) malloc(sizeof(node));
            struct node *current;
            struct node *parent;
            tempNode->data = data;
            tempNode->left = NULL;
            tempNode->right = NULL;
            if(root == NULL) root = tempNode;
            else {
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
                    }
                    else {
                        current = current->right;
                        if(current == NULL) {
                            parent->right = tempNode;
                            return;
                        }
                    }
                }
            }
        }
        void preorder(struct node* root) {
            if(root != NULL) {
                printf("%d ",root->data);
                preorder(root->left);
                preorder(root->right);
            }
        }
        int main() {
            int n,i,x;
            scanf("%d",&n);
            for(i = 0; i < n; i++){
                scanf("%d",&x);
                insert(x);
            }
            preorder(root);
            return 0;
        }`,
        keywords: ["binary", "search", "tree", "preorder", "traversal"]
    },
    {
        id: 32,
        category: "TREE",
        question: "Assign hotel rooms to tourist groups. Each group needs same hotel, assign to first available hotel.",
        description: "Greedy algorithm for hotel room assignment with capacity management.",
        constraints: "1 <= n,m <= 2*10^5, 1 < hi < 10^9, 1 < ri < 10^9",
        code: `#include<iostream>
        using namespace std;
        int main()
        {
            int n,m,i;
            cin>>n>>m;
            int a[n],b[n];
            for(i=0;i<n;i++)
                cin>>a[i];
            for(i=0;i<n;i++)
                cin>>b[i];
            for(i=0;i<m;i++){
                int f=0,j=0;
                for(;j<n;j++){
                    if(a[j]>=b[i]){
                        a[j]-=b[i];
                        f=1;
                        break;
                    }
                }
                if(f>0)
                    cout<<j+1<<" ";
                else
                    cout<<"0 ";
            }
            return 0;
        }`,
        keywords: ["hotel", "rooms", "assignment", "greedy", "capacity"]
    },
    {
        id: 33,
        category: "TREE",
        question: "Add maximum edges to two forests while keeping them as forests and adding same edges to both.",
        description: "Graph theory problem using Union-Find to add edges while maintaining forest property.",
        constraints: "1 <= n <= 10^5, 0 < m1,m2 < n",
        code: `#include<bits/stdc++.h>
        using namespace std;
        typedef long long ll;
        const int mod=998244353;
        int fa[1005],fa2[1005],n,m1,m2;
        int gf(int x,int *f){
            return f[x]==x?x:f[x]=gf(f[x],f);
        }
        int main(){
            cin>>n>>m1>>m2;
            for(int i=1;i<=n;i++)fa[i]=fa2[i]=i;
            for(int i=1,x,y;i<=m1;i++)cin>>x>>y,fa[gf(x,fa)]=gf(y,fa);
            for(int i=1,x,y;i<=m2;i++)cin>>x>>y,fa2[gf(x,fa2)]=gf(y,fa2);
            cout<<n-max(m1,m2)-1<<'\
        ';
            for(int i=1;i<=n;i++){
                for(int j=i+1;j<=n;j++){
                    if(gf(i,fa)!=gf(j,fa)&&gf(i,fa2)!=gf(j,fa2)){
                        cout<<i<<' '<<j<<'\
        ';
                        fa[gf(i,fa)]=gf(j,fa);
                        fa2[gf(i,fa2)]=gf(j,fa2);
                    }
                }
            }
            return 0;
        }`,
        keywords: ["forest", "union", "find", "edges", "graph"]
    },

    // TREE 2 (34-38)
    {
        id: 34,
        category: "TREE",
        question: "Find nearest ancestor with same color for each node in a rooted tree.",
        description: "Tree traversal to find closest parent node with matching color.",
        constraints: "1 <= N <= 100,000, 1 <= C <= 100,000",
        code: `#include<bits/stdc++.h>
        using namespace std;
        int main() {
            int n,i,c;
            scanf("%d %d", &n, &c);
            int tree[n+1][2];
            tree[1][0] = -1;
            for(i=2;i<=n;i++) {
                scanf("%d", &tree[i][0]);
            }
            for(i = 1; i <= n; i++) {
                scanf("%d", &tree[i][1]);
            }
            int parent;
            for(i = 1; i<= n; i++) {
                parent = tree[i][0];
                while(parent != -1 && tree[parent][1] != tree[i][1]) {
                    parent = tree[parent][0];
                }
                printf("%d ", parent);
            }
            return 0;
        }`,
        keywords: ["tree", "ancestor", "color", "nearest", "parent"]
    },
    {
        id: 35,
        category: "TREE",
        question: "Count nodes in subtree containing specific character using DFS.",
        description: "Tree queries to count character occurrences in subtrees using DFS traversal.",
        constraints: "1 <= N,Q < 10^5, 1 < u,v <= N",
        code: `#include<bits/stdc++.h>
        using namespace std;
        void dfs(int node,int parent,string &s,vector<vector<int>>&subroot,vector<vector<int>>& v1)
        {
            subroot[node][s[node-1]-'a']++;
            for( auto it:v1[node])
            {
                if(it!=parent)
                {
                    dfs(it,node,s,subroot,v1);
                    for(int i=0;i<26;i++)
                        subroot[node][i]+=subroot[it][i];
                }
            }
        }
        int main()
        {
            int N,i, Q;
            string S;
            cin >> N >> Q;
            cin >> S;
            vector<vector<int>>v1(N+1);
            for(i=0;i<N-1;i++)
            {
                int u, v;
                cin >> u >> v;
                v1[u].push_back(v);
                v1[v].push_back(u);
            }
            vector<vector<int>>subroot(N+1,vector<int>(26,0));
            dfs(1,0,S,subroot,v1);
            while(Q--)
            {
                int u;
                char c;
                cin >> u >> c;
                cout<<subroot[u][c-'a']<<"\
        ";
            }
            return 0;
        }`,
        keywords: ["subtree", "character", "count", "dfs", "queries"]
    },
    {
        id: 36,
        category: "TREE",
        question: "Maximum movies to watch in time interval using binary lifting on DP array.",
        description: "Interval scheduling with binary lifting optimization for range queries.",
        constraints: "1 <= n,q <= 2*10^5, 1 <= a < b <= 10^6",
        code: `#include<bits/stdc++.h>
        using namespace std;
        int dp[1000006][25];
        int main(){
            int n, q; cin>>n>>q;
            for (int i = 0; i < n; i++) {
                int x, y; cin>>x>>y;
                dp[y][0] = max(dp[y][0], x);
            }
            for (int i = 1; i <= 1000000; i++)
                dp[i][0] = max(dp[i][0], dp[i-1][0]);
            for (int k = 1; k <= 20; k++)
                for (int i = 1; i <= 1000000; i++)
                    dp[i][k] = dp[dp[i][k-1]][k-1];
            while(q--) {
                int x,y; cin>>x>>y;
                int ans = 0;
                while(y>0) {
                    int z = 0;
                    for (int i = 0; i <= 20; i++) {
                        if (dp[y][i] < x) {
                            z = i;
                            break;
                        }
                    }
                    if (z == 0)
                        break;
                    ans += (1<<(z-1));
                    y = dp[y][z-1];
                }
                cout<<ans<<endl;
            }
        }`,
        keywords: ["movies", "interval", "binary", "lifting", "scheduling"]
    },
    {
        id: 37,
        category: "TREE",
        question: "Find maximum bitwise AND value among all pairs in array.",
        description: "Brute force approach to find maximum AND result between any two array elements.",
        constraints: "1 < n < 3*10^5, 1 <= ai <= 10^9",
        code: `# include<stdio.h>
        # include<stdlib.h>
        # include<math.h>
        void input(long *,int);
        int main()
        {
            int n;
            scanf("%d",&n);
            long ptr = (long)malloc(n*sizeof(long));
            input(ptr,n);
            return 0;
        }
        void input(long *ptr, int n)
        {
            int i, j;
            int m;
            for(i=0;i<n;i++)
            {
                scanf("%ld", ptr+i);
            }
            for(i = 0; i < n; i++)
            {
                if (*(ptr + i) <= m)
                {
                    continue;
                }
                for (j = i + 1; j < n; j++)
                {
                    int temp = *(ptr + i) & *(ptr + j);
                    if(temp > m)
                    {
                        m = temp;
                    }
                }
            }
            printf("%d", m);
        }`,
        keywords: ["bitwise", "and", "maximum", "pairs", "array"]
    },
    {
        id: 38,
        category: "TREE",
        question: "Stadium ticket pricing - maximize revenue using priority queue for optimal seat selection.",
        description: "Greedy algorithm with heap to maximize revenue from ticket sales.",
        constraints: "1 <= M <= 1000000, 1 <= N <= 1000000, 1 <= X[i] <= 1000000",
        code: `#include <bits/stdc++.h>
        using namespace std;
        #define PII pair <int, int>
        priority_queue <int> seats;
        map <int, int> x;
        int main()
        {
            int N, M; cin >> N >> M;
            assert (1<=N and N<=1000000);
            assert (1<=M and M<=1000000);
            for (int g=1; g<=N; g++){
                int a; cin >> a;
                seats.push(a);
                assert (1<=a and a<=1000000);
                x[a]++;
            }
            long long ans = 0;
            for (int g=0; g<M; g++){
                int x = seats.top(); ans+=x; seats.pop();seats.push(x-1);
            }
            cout <<ans;
            return 0;
        }`,
        keywords: ["stadium", "tickets", "priority", "queue", "revenue"]
    },

    // GRAPH (39-45)
    {
        id: 39,
        category: "GRAPH",
        question: "Eulerian path in directed graph - traverse each edge exactly once from level 1 to level n.",
        description: "Find Eulerian path using Hierholzer's algorithm for directed graph.",
        constraints: "2 < n < 10^5, 1 <= m <= 2*10^5",
        code: `#include <stdio.h>
        #define N 100000
        #define M 200000
        struct L {
            struct L *next;
            int j;
        } *aa[N];
        struct L *new_L(int j) {
            static struct L l91[M + 1 + M], *l = l91;
            l->j = j;
            return l++;
        }
        void link(int i,int j) {
            struct L *l = new_L(j);
            l->next = aa[i]; aa[i] = l;
        }
        void hierholzer(struct L *e) {
            struct L *f = e->next, *l;
            int i = e->j;
            while ((l = aa[i])) {
                aa[i] = l->next;
                e = e->next = new_L(l->j);
                i = l->j;
            }
            e->next = f;
        }
        int main() {
            static int din[N], dout[N];
            struct L *e_, *e;
            int n, m, h, i, j;
            scanf("%d%d", &n, &m);
            for (h = 0; h < m; h++) {
                scanf("%d%d", &i, &j), i--, j--;
                link(i, j);
                dout[i]++, din[j]++;
            }
            if (dout[0] - din[0] != 1 || din[n - 1] - dout[n - 1] != 1) {
                printf("IMPOSSIBLE\
        ");
                return 0;
            }
            for (i = 1; i < n - 1; i++)
                if (dout[i] != din[i]) {
                    printf("IMPOSSIBLE\
        ");
                    return 0;
                }
            e_ = new_L(0);
            m++;
            hierholzer(e_);
            for (e = e_; e; e = e->next) {
                hierholzer(e);
                m--;
            }
            if (m != 0) {
                printf("IMPOSSIBLE\
        ");
                return 0;
            }
            for (e = e_; e; e = e->next)
                printf("%d ", e->j + 1);
            printf("\
        ");
            return 0;
        }`,
        keywords: ["eulerian", "path", "directed", "graph", "hierholzer"]
    },
    {
        id: 40,
        category: "GRAPH",
        question: "Mail delivery route - find Eulerian circuit in undirected graph starting and ending at post office.",
        description: "Eulerian circuit in undirected graph using modified Hierholzer's algorithm.",
        constraints: "2 < n < 10^5, 1 < m < 2*10^5",
        code: `#include <stdio.h>
        #define N 100000
        #define M 200000
        struct L {
            struct L *next;
            int h;
        } *aa[N];
        int ij[M + 1];
        char lazy[M + 1];
        struct L *new_L(int h) {
            static struct L l91[M * 2 + 1 + M], *l = l91;
            l->h = h;
            return l++;
        }
        void link(int i,int h) {
            struct L *l = new_L(h);
            l->next = aa[i]; aa[i] = l;
        }
        void hierholzer(struct L *e, int i) {
            struct L *f = e->next, *l;
            while ((l = aa[i])) {
                int h = l->h;
                if (lazy[h])
                    aa[i] = l->next;
                else {
                    lazy[h] = 1;
                    e = e->next = new_L(h);
                    i ^= ij[h];
                }
            }
            e->next = f;
        }
        int main() {
            static int dd[N];
            struct L *e_, *e;
            int n, m, h, i, j;
            scanf("%d%d", &n, &m);
            for (h = 1; h <= m; h++) {
                scanf("%d%d", &i, &j), i--, j--;
                ij[h] = i ^ j;
                link(i, h), link(j, h);
                dd[i]++, dd[j]++;
            }
            for (i = 0; i < n; i++)
                if (dd[i] % 2) {
                    printf("IMPOSSIBLE\
        ");
                    return 0;
                }
            e_ = new_L(0);
            i = 0;
            m++;
            for (e = e_; e; e = e->next) {
                i ^= ij[e->h];
                hierholzer(e, i);
                m--;
            }
            if (m != 0) {
                printf("IMPOSSIBLE\
        ");
                return 0;
            }
            i = 0;
            for (e = e_; e; e = e->next) {
                i ^= ij[e->h];
                printf("%d ", i + 1);
            }
            printf("\
        ");
            return 0;
        }`,
        keywords: ["mail", "delivery", "eulerian", "circuit", "undirected"]
    },
    {
        id: 41,
        category: "GRAPH",
        question: "Shortest path with K free roads - modified Dijkstra allowing up to K toll-free edges per destination.",
        description: "Modified shortest path with state-space search allowing K free edges.",
        constraints: "1 <= N <= 10^5, 1 <= M <= 5*10^5, 1 <= W <= 10^6, 1 <= K <= 18",
        code: `#include<bits/stdc++.h>
        using namespace std;
        int main(){
            long long int n,m;
            int k;
            cin>>n>>m>>k;
            vector<pair<long long int,long long int>> adjList[n+1];
            for(long long int i=0;i<m;++i){
                long long int a,b,c;
                cin>>a>>b>>c;
                adjList[a].push_back(pair<long long int,long long int>{b,c});
                adjList[b].push_back(pair<long long int,long long int>{a,c});
            }
            vector<vector<long long int>> dp(n+1,vector<long long int>(k+1,10000000000000));
            queue<pair<long long int,long long int>> q;
            dp[1][0]=0;
            q.push(pair<long long int,long long int>{0,1});
            while(!q.empty()){
                long long int from=q.front().first;
                long long int now=q.front().second;
                q.pop();
                bool change=false;
                for(auto to:adjList[now]){
                    if(to.first==from){
                        continue;
                    }
                    for(int i=0;i<=k;++i){
                        if(i!=k && dp[to.first][i+1] > dp[now][i]){
                            dp[to.first][i+1] = dp[now][i];
                            change=true;
                        }
                        if(dp[to.first][i] > dp[now][i]+to.second){
                            dp[to.first][i] = dp[now][i]+to.second;
                            change=true;
                        }
                    }
                    if(change){
                        q.push(pair<long long int,long long int>{now,to.first});
                    }
                }
            }
            for(long long int i=1; i<=n; i++)
            {
                long long int ans = 10000000000000;
                for(long long int j =0; j<=k; j++)
                {
                    ans = min(ans,dp[i][j]);
                }
                cout<<ans<<" ";
            }
            return 0;
        }`,
        keywords: ["shortest", "path", "free", "roads", "toll", "dijkstra"]
    },
    {
        id: 42,
        category: "GRAPH",
        question: "Detect negative cycle in directed graph using Bellman-Ford algorithm.",
        description: "Cycle detection in weighted directed graph with negative edge weights.",
        constraints: "1 <= n <= 2500, 1 < m < 5000, -10^9 <= c <= 10^9",
        code: `#include <stdio.h>
        #define N 2500
        #define M 5000
        int main() {
            static int aa[M], bb[M], cc[M], pp[N], ii[1 + N];
            static char used[N];
            static long long dd[N];
            int n, m, h, r, a, b, c, k;
            long long d;
            scanf("%d%d", &n, &m);
            for (h = 0; h < m; h++)
                scanf("%d%d%d", &aa[h], &bb[h], &cc[h]), aa[h]--, bb[h]--;
            for (r = 0; r < n; r++)
                for (h = 0; h < m; h++) {
                    a = aa[h], b = bb[h], c = cc[h];
                    d = dd[a] + c;
                    if (dd[b] > d) {
                        dd[b] = d;
                        pp[b] = a;
                        if (r == n - 1) {
                            while (!used[b]) {
                                used[b] = 1;
                                b = pp[b];
                            }
                            k = 0;
                            while (used[b]) {
                                used[b] = 0;
                                ii[k++] = b;
                                b = pp[b];
                            }
                            ii[k++] = b;
                            printf("YES\
        ");
                            while(k--)
                                printf("%d ", ii[k] + 1);
                            printf("\
        ");
                            return 0;
                        }
                    }
                }
            printf("NO\
        ");
            return 0;
        }`,
        keywords: ["negative", "cycle", "bellman", "ford", "directed"]
    },
    {
        id: 43,
        category: "GRAPH",
        question: "Maximum flow - find maximum number of edge-disjoint paths using Dinic's algorithm.",
        description: "Network flow problem to find maximum number of disjoint paths.",
        constraints: "2 < n < 500, 1 <= m <= 1000",
        code: `#include <stdio.h>
        #define N 500
        #define M 1000
        struct L {
            struct L *next;
            int h;
        } aa[N * 2];
        int ij[M + N], cc[(M + N) * 2], dd[N * 2];
        int bfs(int n,int s,int t) {
            static int qq[N * 2];
            int head, cnt, h, i, j, d;
            for (i = 0; i < n; i++)
                dd[i] = n;
            dd[s] = 0;
            head = cnt = 0;
            qq[head + cnt++] = s;
            while (cnt) {
                struct L *l;
                i = qq[cnt--, head++];
                d = dd[i] + 1;
                for (l = aa[i].next; l; l = l->next)
                    if (cc[h = l->h]) {
                        j = i ^ ij[h >> 1];
                        if (dd[j] == n) {
                            dd[j] = d;
                            if (j == t)
                                return 1;
                            qq[head + cnt++] = j;
                        }
                    }
            }
            return 0;
        }
        int dfs(int n, int i, int t) {
            struct L *l;
            int h, j, d;
            if (i == t)
                return 1;
            d = dd[i] + 1;
            for (l = aa[i].next; l; l = l->next)
                if (cc[h = l->h]) {
                    j = i ^ ij[h >> 1];
                    if (dd[j] == d && dfs(n, j, t)) {
                        cc[h]--, cc[h ^ 1]++;
                        return 1;
                    }
                }
            dd[i] = n;
            return 0;
        }
        int dinic(int n, int s, int t) {
            int f = 0;
            while (bfs(n, s, t))
                while (dfs(n, s, t))
                    f++;
            return f;
        }
        void link(int i, int j, int h, int c) {
            static struct L l91[(M + N) * 2], *l = l91;
            ij[h] = i ^ j;
            cc[h << 1] = c;
            l->h = h << 1;
            l->next = aa[i].next, aa[i].next = l++;
            l->h = h << 1 ^ 1;
            l->next = aa[j].next, aa[j].next = l++;
        }
        int qq[N];
        int path(int i, int t) {
            int cnt = 0;
            while (i != t) {
                struct L *l;
                int h;
                qq[cnt++] = i;
                for (l = aa[i].next; l; l = l->next)
                    if (((h = l->h) & 1) == 0 && cc[h ^ 1]) {
                        cc[h]++, cc[h ^ 1]--;
                        i ^= ij[h >> 1];
                        break;
                    }
            }
            qq[cnt++] = t;
            return cnt;
        }
        int main() {
            int n, m, h, i, j, k, s, t, cnt;
            scanf("%d%d", &n, &m);
            for (h = 0; h < m; h++) {
                scanf("%d%d", &i, &j), i--, j--;
                link(i << 1 ^ 1, j << 1, h, 1);
            }
            for (i = 0; i < n; i++)
                link(i << 1, i << 1 ^ 1, m + i, n);
            s = 0, t = (n - 1) << 1 ^ 1;
            k = dinic(n * 2, s, t);
            printf("%d\
        ", k);
            while (k--) {
                cnt = path(s, t);
                printf("%d\
        ", cnt / 2);
                for (i = 0; i < cnt; i += 2)
                    printf("%d ", (qq[i] >> 1) + 1);
                printf("\
        ");
            }
            return 0;
        }`,
        keywords: ["maximum", "flow", "dinic", "disjoint", "paths"]
    },
    {
        id: 44,
        category: "GRAPH",
        question: "Minimum cost to buy tokens for connectivity - greedy algorithm with bitmask and MST.",
        description: "Graph connectivity with token requirements using greedy selection and Union-Find.",
        constraints: "1 <= n <= 10^5, 1 < m <= 10^5, 1 <= ci <= 10^18",
        code: `#include <stdio.h>
        #if defined( _WIN32 )
        typedef __int64 az_int64_t;
        typedef unsigned __int64 az_uint64_t;
        #define I64(x) x ## I64
        #define F64 "I64"
        #else
        typedef long long az_int64_t;
        typedef unsigned long long az_uint64_t;
        #define I64(x) x ## ll
        #define F64 "ll"
        #endif
        #define MAXN (100*1024)
        struct link
        {
            az_int64_t t;
            int u, v;
        };
        struct link links[MAXN];
        int n, m, k;
        az_int64_t c[64];
        int gr[MAXN];
        int getgr( int g )
        {
            return (g == gr[g]) ? g : (gr[g] = getgr( gr[g] ));
        }
        int test( az_int64_t r )
        {
            int i, left = n-1, u, v;
            for(i=1;i<=n;++i) gr[i] = i;
            for( i = 0; i < m; ++i)
                if( (links[i].t & r) == 0 &&
                    (u = getgr( links[i].u )) != (v = getgr( links[i].v )) )
                {
                    gr[v] = u;
                    if( --left == 0 ) return 1;
                }
            return 0;
        }
        int main( void )
        {
            az_int64_t rejected = 0, sum = 0;
            int i;
            scanf( "%d %d %d", &n, &m, &k);
            for( i = 0; i < k; ++i) scanf( "%" F64 "d", &c[i]);
            for( i = 0; i < m; ++i)
            {
                int l, id;
                scanf( "%d %d %d", &links[i].u, &links[i].v, &l);
                while( l-- > 0 )
                {
                    scanf( "%d", &id);
                    links[i].t |= I64(1) << (id-1);
                }
            }
            if( !test( 0 ) )
            {
                printf( "-1\
        " );
                return 0;
            }
            for( i = k-1; i >= 0; --i)
            {
                az_int64_t f = I64(1) << i;
                if( test( rejected | f ) ) rejected |= f; else sum += c[i];
            }
            printf( "%" F64 "d\
        ", sum);
            return 0;
        }`,
        keywords: ["tokens", "connectivity", "greedy", "bitmask", "mst"]
    },
    {
        id: 45,
        category: "GRAPH",
        question: "Functional graph - calculate path lengths from each starting planet using cycle detection.",
        description: "Path calculation in functional graph with cycle detection and memoization.",
        constraints: "1 <= n <= 2*10^5, 1 <= ti < n",
        code: `#include <stdio.h>
        #include <string.h>
        #define N 200000
        int main() {
            static int aa[N], cc[N], dd[N], qq[N];
            int n, i, j, c, d, q, cnt;
            scanf("%d", &n);
            for (i = 0; i < n; i++)
                scanf("%d", &aa[i]), aa[i]--;
            memset(cc, -1, n * sizeof *cc);
            cnt = 0;
            for(i = 0;i<n;i++) {
                if (cc[i] != -1)
                    continue;
                d = 0;
                j = i;
                while (cc[j] == -1) {
                    cc[j] = -2;
                    d++;
                    j = aa[j];
                }
                if (cc[j] == -2) {
                    c = cnt++;
                    q = 0;
                    while (cc[j] == -2) {
                        cc[j] = c;
                        q++;
                        j = aa[j];
                    }
                    qq[c] = q;
                    d -= q;
                } else {
                    c = cc[j];
                    d += dd[j];
                }
                j = i;
                while (cc[j] == -2) {
                    cc[j] = c;
                    dd[j] = d--;
                    j = aa[j];
                }
            }
            for (i = 0; i < n; i++)
                printf("%d ", dd[i] + qq[cc[i]]);
            printf("\
        ");
            return 0;
        }`,
        keywords: ["functional", "graph", "cycle", "detection", "path"]
    },

    // HASHING (46-50)
    {
        id: 46,
        category: "HASHING",
        question: "Dynamic array with set/query operations - set value at index, find smallest index >= y with specific value.",
        description: "Dynamic array operations with range queries using simple array implementation.",
        constraints: "1 <= n <= 10^9, 1 <= q <= 5*10^5",
        code: `#include<iostream>
        using namespace std;
        #define f(i,a,n) for(int i=a;i<n;i++)
        int main()
        {
            int i,t,q,m,n;
            cin>>t>>q;
            int a[t];
            f(i,0,t)
                a[i]=0;
            for(i=0;i<q;i++){
                cin>>m>>n;
                if(m==1){
                    a[n]=1;
                }
                if(m==2){
                    int cnt=0,j=0;
                    for(j=n;j<q;j++){
                        if(a[j]==1)
                        {
                            cnt=1;
                            break;
                        }
                    }
                    if(cnt==1)
                        cout<<j<<endl;
                    else
                        cout<<"-1"<<endl;
                }
            }
            return 0;
        }`,
        keywords: ["dynamic", "array", "set", "query", "operations"]
    },
    {
        id: 47,
        category: "HASHING",
        question: "Rick vs Walkers - determine if Rick survives based on shooting capacity and walker distances.",
        description: "Simulation problem with reloading mechanics and distance-based survival.",
        constraints: "1 <= t <= 100, 1 <= n <= 100000, 1 <= dis[i] <= 50000",
        code: `#include<bits/stdc++.h>
        using namespace std;
        int32_t main() {
            int T;
            cin>>T;
            while(T--) {
                bool ans=true;
                int val=0;
                int n;
                cin>>n;
                int temp;
                int mx[50001],cnt[50001];
                memset(mx,0,sizeof(mx));
                memset(cnt,0,sizeof(cnt));
                int tp=2;
                mx[0]=1;
                for(int i=1;i<50001;i++) {
                    mx[i]=tp;
                    if(tp%6==0) {
                        i++;
                        mx[i]=tp;
                    }
                    tp++;
                }
                for(int i=0;i<n;i++) {
                    cin>>temp;
                    temp--;
                    cnt[temp]++;
                }
                for(int i=0;i<50001;i++) {
                    if(i>0)
                        cnt[i]+=cnt[i-1];
                    if(cnt[i]>mx[i]) {
                        ans=false;
                        val=i;
                        break;
                    }
                }
                if(ans)
                    cout<<"Rick now go and save Carl and Judas"<<endl;
                else
                {
                    val=mx[val];
                    cout<<"Goodbye Rick\
        "<<val<<endl;
                }
            }
            return 0;
        }`,
        keywords: ["rick", "walkers", "simulation", "survival", "shooting"]
    },
    {
        id: 48,
        category: "HASHING",
        question: "Count unique pairs (Ai, Aj) where i < j - find number of distinct pairs in array.",
        description: "Hash set to count unique pairs from array elements.",
        constraints: "1 <= N <= 2*10^5, 1 <= A <= 10^9",
        code: `#include <iostream>
        #include <set>
        using namespace std;
        int getPairs(int arr[], int n)
        {
            set<pair<int, int>> h;
            for(int i = 0; i < (n - 1); i++)
            {
                for (int j = i + 1; j < n; j++)
                {
                    h.insert(make_pair(arr[i], arr[j]));
                }
            }
            return h.size();
        }
        int main()
        {
            int n,i;
            cin>>n;
            int arr[n];
            for(i=0;i<n;i++)
                cin>>arr[i];
            cout << getPairs(arr, n);
            return 0;
        }`,
        keywords: ["unique", "pairs", "count", "hash", "set"]
    },
    // Continue from questions 46-50...

    {
        id: 49,
        category: "HASHING",
        question: "Queen game on infinite board - determine winner based on queen position using golden ratio.",
        description: "Game theory problem using mathematical properties and golden ratio calculations.",
        constraints: "1 <= t <= 10000, 0 <= a,b <= 1000000",
        code: `#include <stdio.h>
        #include<math.h>
        int v[2000000],i,t;
        double fi;
        int main()
        {
            fi=((double)((1+sqrt(5))/2.0));
            for(i=1;i<=1000000;i++)
                v[i]=-1;
            for(i=1;i<=1000000;i++)
                v[(int)(fi*(double)i)] = (int)(fi*fi*i);
            scanf("%d",&t);
            while(t--){
                int a,b;
                scanf("%d %d",&a,&b);
                if(v[a]==b)
                    printf("sami\
        ");
                else
                    printf("canthi\
        ");
            }
            return 0;
        }`,
        keywords: ["queen", "game", "theory", "golden", "ratio"]
    },
    {
        id: 50,
        category: "HASHING",
        question: "Arrange students in camps where all students in each camp have names of equal length.",
        description: "Check if students can be divided into groups based on name length constraints.",
        constraints: "1 <= Test Cases <= 50, 1 <= N <= 1000, 1 <= K <= 1000",
        code: `#include <stdio.h>
        #include <stdlib.h>
        #include <string.h>
        int main()
        {
            int cases, N, K, i, j, len, bins[100], flag;
            scanf("%d", &cases);
            int results[cases];
            
            for(i=0;i<cases;i++) {
                flag = 0;
                for (j=0; j<100; j++) {
                    bins[j] = 0;
                }
                
                scanf("%d %d", &N, &K);
                char str[N][100];
                
                for (j=0; j<N; j++) {
                    scanf("%s", str[j]);
                    len = strlen(str[j]);
                    bins[len] += 1;
                }
                
                for (j=0; j<100; j++) {
                    if (bins[j] % K != 0) {
                        results[i] = 0;
                        flag = 1;
                        break;
                    }
                }
                if (flag == 0) {
                    results[i] = 1;
                }
            }
            
            for (i=0; i<cases; i++) {
                if (results[i] == 0) {
                    printf("Not possible\
        ");
                }
                else {
                    printf("Possible\
        ");
                }
            }
            return 0;
        }`,
        keywords: ["students", "camps", "names", "length", "grouping"]
    }
];

// Export the complete dataset
if (typeof module !== 'undefined' && module.exports) {
    module.exports = dsaQuestions;
} else if (typeof window !== 'undefined') {
    window.dsaQuestions = dsaQuestions;
}

console.log(\Loaded \${dsaQuestions.length} DSA questions from SRM Institute elab\);

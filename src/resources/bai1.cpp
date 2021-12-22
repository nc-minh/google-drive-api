#include<bits/stdc++.h>
using namespace std;
void nhap(int a[], int &n, string &fileName){
    //create new file
    ofstream outfile;

    for(int i=0; i<n; i++){
        cin>>a[i];
    }


    outfile.open(fileName);

    for(int j=0; j<n; j++){
        outfile<<a[j]<<endl;
    }


    cout<<"Ghi thanh cong vao file!:"<<endl;
    outfile.close();
}
void xuat(int a[], int &n, string &fileName){

    ifstream infile;

    infile.open(fileName);

    for(int i=0; i<n; i++){
        infile>>a[i];
        cout<<a[i]<<"   ";
    }

    cout<<"\nDoc thanh cong vao file!:"<<endl;
    infile.close();
}

void sapxep(int a[],int &n, string &fileNameIn){
    ofstream outfile;
    outfile.open(fileNameIn);
    for(int i=0; i<n-1; i++){
        for(int j=i+1; j<n; j++){
            if(a[i]>a[j]){
                swap(a[i], a[j]);
            }
        }
    }
    cout<<"Mang sau khi da sap xep!"<<endl;
    for(int k=0; k<n; k++){
        outfile<<a[k]<<endl;
        cout<<a[k]<<"   ";
    }

    cout<<"\nLuu sau khi sap xep thanh cong!:"<<endl;
    outfile.close();
}
int main(){
    int n;
    cin>>n;
    int a[n];
    string fileNameIn;
    cout<<"Nhap ten file muon ghi (filename.txt): ";
    cin>>fileNameIn;
    nhap(a,n, fileNameIn);
    string fileNameOut;
    cout<<"Nhap ten file muon doc (filename.txt): ";
    cin>>fileNameOut;
    xuat(a,n,fileNameOut);
    sapxep(a,n,fileNameIn);
}

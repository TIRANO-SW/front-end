from django.shortcuts import render, redirect

# Create your views here.
def index(request):
    if request.method == "POST":
        print(request.POST.get('bokji-type'))
        return redirect("/")
    return render(request, "landing/index.html")

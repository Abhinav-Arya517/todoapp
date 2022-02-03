from django import forms

from .models import Task

class TaskForm(forms.ModelForm):
    class Meta:
        model = Task
        fields = ['title', 'target_date']

        widgets = {
            'title': forms.TextInput(attrs={'class': 'form-control', 'placeholder':'Task Description'}),
            'target_date': forms.SelectDateWidget(attrs={'class':'form-control'})
        }

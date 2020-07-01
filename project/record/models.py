from django.db import models

#主题
class Topic(models.Model):
    text = models.CharField(max_length = 200)
    date_added = models.DateTimeField(auto_now_add = True)

    def __str__(self):
        return self.text

#内容
class Entry(models.Model):
    topic = models.ForeignKey(Topic, on_delete = models.CASCADE)
    text = models.TextField()
    date_added = models.DateTimeField(auto_now_add = True)

    def __str__(self):
        return self.text[:50] + '...'

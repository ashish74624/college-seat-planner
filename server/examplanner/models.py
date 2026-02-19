from django.db import models

class Classroom(models.Model):
    roomId = models.CharField(max_length=50, unique=True)
    capacity = models.IntegerField()
    floorNo = models.IntegerField()
    nearWashroom = models.BooleanField(default=False)

    def __str__(self):
        return self.roomId

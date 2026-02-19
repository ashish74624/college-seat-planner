from django.db import models

class Classroom(models.Model):
    roomId = models.CharField(max_length=20, unique=True)
    capacity = models.PositiveIntegerField()
    floorNo = models.PositiveIntegerField()
    nearWashroom = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.roomId} (Floor {self.floorNo})"

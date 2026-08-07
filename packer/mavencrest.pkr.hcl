packer {
  required_plugins {
    amazon = {
      source  = "github.com/hashicorp/amazon"
      version = ">= 1.3.0"
    }
  }
}

variable "source_ami" {
  type = string
}

variable "subnet_id" {
  type = string
}

source "amazon-ebs" "mavencrest" {
  region               = "us-east-1"
  instance_type        = "t3.small"
  ssh_username         = "ec2-user"
  iam_instance_profile = "nextjs-ec2-profile-prod"

  source_ami = var.source_ami
  subnet_id  = var.subnet_id

  ami_name = "mavencrest-{{timestamp}}"

  tags = {
    Name        = "mavencrest"
    Environment = "prod"
    ManagedBy   = "Packer"
  }
}

build {
  sources = ["source.amazon-ebs.mavencrest"]

  provisioner "shell" {
    inline = [
      "mkdir -p /tmp/mavencrest-src"
    ]
  }
  provisioner "file" {
  source      = "/tmp/mavencrest-build/"
  destination = "/tmp/mavencrest-src"
 }

  provisioner "shell" {
    script = "${path.root}/scripts/build-app.sh"
  }

  post-processor "manifest" {
    output = "manifest.json"
    strip_path = true
  }
}